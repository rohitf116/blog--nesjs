import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthorizationGuard } from 'src/users/authorization.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    UsersModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService, AuthorizationGuard],
  exports: [BlogsService],
})
export class BlogsModule {}
