import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutosService } from './produtos.service';
import { JwtAuthGuard } from 'src/auth/user/jwt/jwt-auth-guard';
import { CurrentUser } from 'src/auth/user/dto/current-user.decorator';
import { CurrentUserDto } from 'src/auth/user/dto/current-user.tdo';
import { Roles } from 'src/auth/user/roles/roles.decorator';

@UseGuards(JwtAuthGuard)
@Roles('ADMIN', 'DEFAULT')
@Controller(`${process.env.API_VERSION}/produtos`)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @CurrentUser() { userId }: CurrentUserDto,
  ) {
    return this.produtosService.create(createProdutoDto, userId);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findAllByUserId(@Param('id') userId: string) {
    return this.produtosService.findAllByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
