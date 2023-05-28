import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Import the JwtStrategy here
import { AuthorizationGuard } from './authorization.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'hello', signOptions: { expiresIn: 3600 } }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy, AuthorizationGuard],
  exports: [JwtStrategy, PassportModule, AuthService, AuthorizationGuard],
})
export class UsersModule {}
