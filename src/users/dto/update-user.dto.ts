import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Title } from '../enum/title.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  fname: string;

  @IsString()
  @IsOptional()
  lname: string;

  @IsString()
  @IsEnum(Title)
  @IsOptional()
  title: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;
}
