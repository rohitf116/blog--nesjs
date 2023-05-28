import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWTPayload } from './Jwt.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      secretOrKey: 'hello',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { _id } = payload;
    const user: User = await this.userModel.findOne({ _id }).exec();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
