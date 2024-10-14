import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { UserModule as AuthModule } from './auth/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserAdministrationModule } from './user-administration/user-administration.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AuthModule,
    ProdutosModule,
    UserAdministrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
