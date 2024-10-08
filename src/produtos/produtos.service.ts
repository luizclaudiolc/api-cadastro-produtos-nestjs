import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { log } from 'console';

@Injectable()
export class ProdutosService {
  private produtos: CreateProdutoDto[] = [];

  create(createProdutoDto: CreateProdutoDto) {
    if (createProdutoDto.id)
      createProdutoDto.id = String(`abc-${Math.floor(Math.random() * 500)}`);
    log(createProdutoDto.id);
    this.produtos.push(createProdutoDto);
    return this.produtos;
  }

  findAll() {
    return this.produtos;
  }

  findOne(_id: string) {
    const index = this.produtos.findIndex(({ id }) => id === _id);
    if (index === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Produto com id: ${_id} não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'error',
        },
      );
    }

    return this.produtos[index];
  }

  update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const index = this.produtos.findIndex((produto) => produto.id === id);
    if (index === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Produto com id: ${id} não encontrado!`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'error',
        },
      );
    }

    this.produtos[index] = { ...this.produtos[index], ...updateProdutoDto };
    return this.produtos[index];
  }

  remove(_id: string) {
    this.produtos = this.produtos.filter(({ id }) => id !== _id);
    return this.produtos;
  }
}
