import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { UserModule } from 'src/auth/user/user.module';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService],
  imports: [UserModule],
})
export class ProdutosModule {}
