import { IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  id?: string;

  @IsString()
  cod: string;

  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsString()
  qtd: string;
}
