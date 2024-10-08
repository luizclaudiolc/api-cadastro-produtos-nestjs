import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { Prisma } from '@prisma/client';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

export interface IProduto {
  id: string;
  cod: string;
  name: string;
  value: string;
  qtd: string;
}

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<IProduto> {
    return this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  async findAll(): Promise<IProduto[]> {
    return this.prisma.produto.findMany();
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produtoExiste = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produtoExiste) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Produto não encontrado!`,
        },
        HttpStatus.BAD_REQUEST,
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
          status: HttpStatus.BAD_REQUEST,
          error: `Produto não encontrado!`,
        },
        HttpStatus.BAD_REQUEST,
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
