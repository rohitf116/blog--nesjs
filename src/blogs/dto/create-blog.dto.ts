import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsMongoId,
} from 'class-validator';
export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  authorId: string;

  @IsString({ each: true })
  tages: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString({ each: true })
  subcategory: string[];
}
