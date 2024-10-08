import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { UserModule } from './auth/user/user.module';

@Module({
  imports: [ProdutosModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
