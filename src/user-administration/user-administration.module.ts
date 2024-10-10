import { Module } from '@nestjs/common';
import { UserAdministrationService } from './user-administration.service';
import { UserAdministrationController } from './user-administration.controller';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { UserService } from 'src/auth/user/user.service';
import { UserModule } from 'src/auth/user/user.module';

@Module({
  controllers: [UserAdministrationController],
  providers: [UserAdministrationService, PrismaService, UserService],
  imports: [UserModule],
})
export class UserAdministrationModule {}
