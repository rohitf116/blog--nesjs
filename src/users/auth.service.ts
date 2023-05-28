import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchema } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWTPayload } from './Jwt.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('Email is in use');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    return this.usersService.create(createUserDto);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { _id: user._id.toString() };
      const token = this.jwtService.sign(payload);
      return { accessToken: token };
    }
    throw new UnauthorizedException('Check your credintials');
  }
  checkOwner(userId: any, blog: any) {
    console.log();
    let isOwner: Boolean;
    try {
      isOwner = userId.toString() === blog._id.toString();
    } catch (error) {
      throw new UnauthorizedException('Not authorized');
    }

    if (!isOwner) {
      throw new UnauthorizedException(
        'You are not authorized to update this blog.',
      );
    }
    return true;
  }
}
