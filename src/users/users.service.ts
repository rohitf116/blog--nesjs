import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model, Connection, Types } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { GetUser } from './get-current-user.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    return savedUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: Types.ObjectId, userId: any) {
    if (id.toString() !== userId.toString()) {
      throw new UnauthorizedException('You are not authorized');
    }
    return this.userModel.findById(id).exec();
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  async update(
    id: Types.ObjectId,
    attrs: Partial<User>,
    @GetUser() userId: any,
  ) {
    if (id.toString() !== userId.toString()) {
      throw new UnauthorizedException('You are not authorized');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    await user.save();
    return user;
  }

  async remove(id: Types.ObjectId, userId: any) {
    if (id.toString() !== userId.toString()) {
      throw new UnauthorizedException('You are not authorized');
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return { statusCode: 204, message: 'User deleted successfully' };
  }
}
