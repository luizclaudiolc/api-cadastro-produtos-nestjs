import { Prisma } from '@prisma/client';

export class Produto implements Prisma.ProdutoCreateInput {
  id?: string;
  cod: string;
  name: string;
  value: string;
  qtd: string;
  user: Prisma.UserCreateNestedOneWithoutProdutosInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
