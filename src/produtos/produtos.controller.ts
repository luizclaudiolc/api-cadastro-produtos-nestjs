import {
  Body,
  Controller,
  Delete,
  Get,
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
import { log } from 'console';

@UseGuards(JwtAuthGuard)
@Controller(`${process.env.API_VERSION}/produtos`)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.produtosService.create(createProdutoDto, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserDto) {
    log(user);
    return this.produtosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.produtosService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
