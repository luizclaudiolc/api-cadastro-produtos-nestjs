import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { UpdateUserDto } from 'src/auth/user/dto/update-user.dto';

export interface IUserAdminstration {
  id: string;
  nome: string;
  sobrenome: string;
  cargo: string;
}

@Injectable()
export class UserAdministrationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IUserAdminstration[]> {
    const users = await this.prisma.user.findMany();
    const filteredUsers = this.getAllUsersDefautt(users);

    if (filteredUsers.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Não há usuário não cadastrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Não há usuário não cadastrado!`,
        },
      );
    }

    return filteredUsers;
  }

  async findOne(userId: string): Promise<IUserAdminstration[]> {
    const users = await this.prisma.user.findMany();
    const allUsersDefault = this.getAllUsersDefautt(users);
    const user = allUsersDefault.filter(({ id }) => id === userId);
    if (user.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuário não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Usário não encontrado!`,
        },
      );
    }
    return user;
  }

  async update(
    userId: string,
    data: UpdateUserDto,
  ): Promise<IUserAdminstration[]> {
    const allUsers = await this.prisma.user.findMany();
    const allUsersDefault = this.getAllUsersDefautt(allUsers);
    const _user = allUsersDefault.filter(({ id }) => id === userId);

    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuário não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Usuário não encontrado!`,
        },
      );
    }

    const user = [
      await this.prisma.user.update({
        where: { id: userId },
        data,
      }),
    ];

    const userUpdated = user.map(({ first_name, last_name, position, id }) => ({
      id,
      nome: first_name,
      sobrenome: last_name,
      cargo: position,
    }));

    return userUpdated;
  }

  async remove(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuário não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Usuário não encontrado!`,
        },
      );
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  }

  private getAllUsersDefautt(users: any[]): IUserAdminstration[] {
    const filteredUsers = users
      .filter(({ role }) => role === 'DEFAULT')
      .map(({ first_name, last_name, position, id }) => ({
        id,
        nome: first_name,
        sobrenome: last_name,
        cargo: position,
      }));

    return filteredUsers;
  }
}
