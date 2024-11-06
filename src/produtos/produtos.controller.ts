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
import { CurrentUser } from 'src/auth/user/dto/current-user.decorator';
import { CurrentUserDto } from 'src/auth/user/dto/current-user.tdo';
import { JwtAuthGuard } from 'src/auth/user/jwt/jwt-auth-guard';
import { Roles } from 'src/auth/user/roles/roles.decorator';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutosService } from './produtos.service';

@UseGuards(JwtAuthGuard)
@Roles('ADMIN', 'DEFAULT')
@Controller(`${process.env.API_VERSION}/produtos`)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @CurrentUser() { userId }: CurrentUserDto,
  ) {
    return this.produtosService.create(createProdutoDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.produtosService.findOneById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
    @CurrentUser() { userId }: CurrentUserDto,
  ) {
    return this.produtosService.update(id, updateProdutoDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
