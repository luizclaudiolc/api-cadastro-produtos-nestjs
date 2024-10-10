import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { MESSEGE_HELPERS, REGEX_HELPERS } from 'src/utils/helpers';
import { $Enums } from '@prisma/client';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(REGEX_HELPERS.password, {
    message: MESSEGE_HELPERS.password_matches,
  })
  password: string;

  @IsString()
  @IsOptional()
  role?: $Enums.UserRole;
}
