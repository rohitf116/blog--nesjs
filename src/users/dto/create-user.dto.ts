import { IsString, IsEmail, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fname: string;
  @IsString()
  lname: string;
  @IsString()
  title: string;

  @IsEmail()
  email: string;
  @IsString()
  @Min(8)
  password: string;
}
