import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogPostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreateBlogPostDto): Promise<void> {
    await this.prisma.blogPost.create({
      data: createPostDto,
    });
  }

  async findAll(): Promise<BlogPostResponseDto[]> {
    const posts = await this.prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      commentCount: post._count.comments,
    }));
  }

  async findOne(
    query: Prisma.BlogPostFindFirstArgs,
  ): Promise<BlogPostResponseDto> {
    return await this.prisma.blogPost.findFirst(query);
  }

  async update(
    id: string,
    updatePostDto: UpdateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    return await this.prisma.blogPost.update({
      where: { id },
      data: updatePostDto,
    });
  }
}
