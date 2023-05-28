import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Title } from '../enum/title.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  fname: string;
  @Prop()
  lname: string;
  @Prop({ enum: Title })
  title: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
