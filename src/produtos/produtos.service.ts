import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

export interface IProduto {
  id?: string;
  cod: string;
  name: string;
  value: string;
  qtd: string;
}

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProdutoDto, userId: string): Promise<IProduto> {
    return this.prisma.produto.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(): Promise<IProduto[]> {
    return this.prisma.produto.findMany({
      select: {
        cod: true,
        name: true,
        value: true,
        qtd: true,
        user: {
          select: { first_name: true, position: true },
        },
      },
    });
  }

  async findAllByUserId(userId: string): Promise<IProduto[]> {
    const productsForUser = await this.prisma.produto.findFirst({
      where: { userId },
    });

    if (!productsForUser) {
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

    return this.prisma.produto.findMany({
      where: { userId },
      select: {
        cod: true,
        name: true,
        value: true,
        qtd: true,
      },
    });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produtoExiste = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produtoExiste) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Produto não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Produto não encontrado!`,
        },
      );
    }

    const produto = await this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });

    return produto;
  }

  async remove(id: string) {
    const produtoExiste = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produtoExiste) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Produto não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: `Produto não encontrado!`,
        },
      );
    }

    const produto = await this.prisma.produto.delete({
      where: { id },
    });

    return produto;
  }
}
