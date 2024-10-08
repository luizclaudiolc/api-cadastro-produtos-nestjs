import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    data.password = hashSync(data.password, +process.env.SALT_HASH);

    const { first_name, last_name, position, email } =
      await this.prisma.user.create({
        data: data,
      });

    return { first_name, last_name, position, email };
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

    return existingUser;
  }
}