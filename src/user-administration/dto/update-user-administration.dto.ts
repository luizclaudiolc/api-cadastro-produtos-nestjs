import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAdministrationDto } from './create-user-administration.dto';

export class UpdateUserAdministrationDto extends PartialType(CreateUserAdministrationDto) {}
