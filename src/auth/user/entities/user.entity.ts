import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  password: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted_at?: string | Date;
  produtos?: Prisma.ProdutoUncheckedCreateNestedManyWithoutUserInput;
}
