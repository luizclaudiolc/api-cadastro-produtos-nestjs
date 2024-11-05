import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

interface TokenEntry {
  tokenId: string;
  timestamp: number;
}

@Injectable()
export class UserService {
  private refreshTokenVersions: Map<string, TokenEntry> = new Map();
  private readonly MAX_MAP_SIZE = 10000;
  private readonly TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.cleanupExpiredTokens();
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  private cleanupExpiredTokens() {
    const now = Date.now();
    for (const [userId, entry] of this.refreshTokenVersions.entries()) {
      if (now - entry.timestamp > this.TOKEN_EXPIRATION) {
        this.refreshTokenVersions.delete(userId);
      }
    }
    // console.log(
    //   `Limpeza realizada. Tamanho atual do Map: ${this.refreshTokenVersions.size}`,
    // );
  }

  private cleanupIfNeeded() {
    if (this.refreshTokenVersions.size > this.MAX_MAP_SIZE) {
      const entriesToRemove =
        this.refreshTokenVersions.size - this.MAX_MAP_SIZE;
      const sortedEntries = [...this.refreshTokenVersions.entries()].sort(
        (a, b) => a[1].timestamp - b[1].timestamp,
      );

      for (let i = 0; i < entriesToRemove; i++) {
        this.refreshTokenVersions.delete(sortedEntries[i][0]);
      }
      // console.log(
      //   `Limpeza baseada em tamanho realizada. Removidos ${entriesToRemove} registros.`,
      // );
    }
  }

  async signUp(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    data.password = hashSync(data.password, +process.env.SALT_HASH);

    const { first_name, last_name, position, email, role } =
      await this.prisma.user.create({
        data,
      });

    return { first_name, last_name, position, email, role };
  }

  async signIn(data: { email: string; password: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser)
      throw new UnauthorizedException('Credenciais inválidas!');

    const validPassword = compareSync(data.password, existingUser.password);

    if (!validPassword)
      throw new UnauthorizedException('Usuário ou senha incorretos');

    const userId = existingUser.id;
    const tokenId = uuidv4();
    this.refreshTokenVersions.set(userId, { tokenId, timestamp: Date.now() });
    this.cleanupIfNeeded();

    const payload = {
      username: existingUser.email,
      sub: existingUser.id,
      role: [existingUser.role],
      tokenId,
      userId,
    };

    const accessToken = this.jwtService.sign(
      { ...payload, type: 'access' },
      { expiresIn: '120s' },
    );

    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      { expiresIn: '1h' },
    );

    return {
      accessToken,
      refreshToken,
      name: existingUser.first_name,
      last_name: existingUser.last_name,
      role: existingUser.role,
      userId,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      const storedEntry = this.refreshTokenVersions.get(payload.sub);
      if (!storedEntry || storedEntry.tokenId !== payload.tokenId) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newTokenId = uuidv4();
      this.refreshTokenVersions.set(payload.sub, {
        tokenId: newTokenId,
        timestamp: Date.now(),
      });
      this.cleanupIfNeeded();

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = {
        username: user.email,
        sub: user.id,
        role: [user.role],
        tokenId: newTokenId,
        userId: user.id,
      };

      const newAccessToken = this.jwtService.sign(
        { ...newPayload, type: 'access' },
        { expiresIn: '120s' },
      );

      const newRefreshToken = this.jwtService.sign(
        { ...newPayload, type: 'refresh' },
        { expiresIn: '1h' },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        userId: user.id,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
