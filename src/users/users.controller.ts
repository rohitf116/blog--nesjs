import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateObjectId } from 'src/decorators/validObjectId.decorator';
import { Types } from 'mongoose';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { GetUser } from './get-current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('/signin')
  singin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/my')
  @UseGuards(AuthGuard())
  whoIs(@GetUser() user: any) {
    return user;
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(SerializeInterceptor)
  async findOne(
    @ValidateObjectId() id: Types.ObjectId,
    @GetUser() userId: any,
  ) {
    const user = await this.usersService.findOne(id, userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(SerializeInterceptor)
  update(
    @ValidateObjectId() id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() userId: any,
  ) {
    return this.usersService.update(id, updateUserDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@ValidateObjectId() id: Types.ObjectId, @GetUser() userId: any) {
    return this.usersService.remove(id, userId);
  }
}
