import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: SchemaTypes.ObjectId })
  authorId: string;

  @Prop()
  tages: string[];

  @Prop()
  category: string;

  @Prop()
  subcategory: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  publishedAt: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
