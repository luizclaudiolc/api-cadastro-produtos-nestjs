import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserAdministrationService } from './user-administration.service';
import { CreateUserDto } from 'src/auth/user/dto/create-user.dto';
import { UserService } from 'src/auth/user/user.service';
import { JwtAuthGuard } from 'src/auth/user/jwt/jwt-auth-guard';
import { Roles } from 'src/auth/user/roles/roles.decorator';
import { UpdateUserDto } from 'src/auth/user/dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
@Controller(`${process.env.API_VERSION}/admin/users`)
export class UserAdministrationController {
  constructor(
    private readonly userAdministrationService: UserAdministrationService,
    private readonly authService: UserService,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @Get()
  findAll() {
    return this.userAdministrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAdministrationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userAdministrationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAdministrationService.remove(id);
  }
}
