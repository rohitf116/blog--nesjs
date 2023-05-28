import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Title } from '../enum/title.enum';

export class CreateUserDto {
  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsString()
  @IsEnum(Title)
  title: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
