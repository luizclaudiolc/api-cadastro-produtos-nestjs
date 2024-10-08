import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller(`${process.env.API_VERSION}/auth/`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() body: { email: string; password: string }) {
    return this.userService.signIn(body);
  }
}
