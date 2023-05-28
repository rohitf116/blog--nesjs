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
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-current-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from 'src/users/auth.service';
import { ValidateObjectId } from 'src/decorators/validObjectId.decorator';
import { Types } from 'mongoose';
import { AuthorizationGuard } from 'src/users/authorization.guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createBlogDto: CreateBlogDto, @GetUser() id: any) {
    return this.blogsService.create(createBlogDto, id);
  }

  @Get('/who')
  @UseGuards(AuthGuard())
  who(@GetUser() user: any) {
    return user;
  }
  @Get('/my')
  @UseGuards(AuthGuard())
  my(@GetUser() userId: any) {
    return this.blogsService.my(userId);
  }
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@ValidateObjectId() id: Types.ObjectId) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @ValidateObjectId() id: Types.ObjectId,
    @Body() updateBlogDto: UpdateBlogDto,
    @GetUser() user: any,
  ) {
    return this.blogsService.update(id, updateBlogDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@ValidateObjectId() id: Types.ObjectId, @GetUser() userId: any) {
    return this.blogsService.remove(id, userId);
  }
}
