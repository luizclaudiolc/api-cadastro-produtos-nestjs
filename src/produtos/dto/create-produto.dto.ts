import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Produto } from '../entities/produto.entity';

export class CreateProdutoDto extends Produto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  cod: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  qtd: string;
}
