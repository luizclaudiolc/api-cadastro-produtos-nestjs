import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller(`${process.env.API_VERSION}/auth/`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: { email: string; password: string }) {
    return this.userService.signIn(body);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() body: { refreshToken: string }) {
    return this.userService.refreshToken(body.refreshToken);
  }
}
