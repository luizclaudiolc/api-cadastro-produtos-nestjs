import { IsOptional, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  cod: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  qtd: string;
}
