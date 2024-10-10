import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

    if (!existingUser) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const validPassword = compareSync(data.password, existingUser.password);

    if (!validPassword)
      throw new UnauthorizedException('Usuário ou senha incorretos');

    const payload = {
      username: existingUser.email,
      sub: existingUser.id,
      role: [existingUser.role],
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
