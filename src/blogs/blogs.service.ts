import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.schema';
import { Connection, Model, Types } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from 'src/users/auth.service';
import { GetUser } from 'src/users/get-current-user.decorator';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectConnection() private connection: Connection,
    private authService: AuthService,
  ) {}
  async create(createBlogDto: CreateBlogDto, id: any) {
    createBlogDto.authorId = id;
    const blog = new this.blogModel(createBlogDto);
    const savedBlog = await blog.save();
    return savedBlog;
  }

  async findAll() {
    const blogs = await this.blogModel.find({
      isDeleted: false,
      isPublished: true,
    });
    console.log(blogs);
    return blogs;
  }
  my(userId: Types.ObjectId) {
    return this.blogModel.find({
      isDeleted: false,
      authorId: userId,
      isPublished: true,
    });
  }
  findOne(id: Types.ObjectId) {
    return this.blogModel.findOne({
      isDeleted: false,
      _id: id,
      isPublished: true,
    });
  }

  async update(
    id: Types.ObjectId,
    attrs: Partial<Blog>,
    @GetUser() userId: any,
  ) {
    const blog = await this.blogModel
      .findOne({ _id: id, isDeleted: false })
      .exec();
    if (!blog || blog.isDeleted) {
      throw new NotFoundException('Blog not found');
    }
    this.authService.checkOwner(blog.authorId, userId);

    Object.assign(blog, attrs);
    blog.isPublished = true;
    blog.publishedAt = new Date().toISOString();
    await blog.save();
    return blog;
  }

  async remove(id: Types.ObjectId, @GetUser() userId: any) {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog || blog.isDeleted) {
      throw new NotFoundException('Blog not found');
    }
    console.log(blog);
    blog.isDeleted = true;
    blog.deletedAt = new Date().toISOString();
    this.authService.checkOwner(blog.authorId, userId);
    await blog.save();
    return { message: 'Blog is successfully deleted' };
  }
}
