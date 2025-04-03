import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    blogPostId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        blogPost: {
          connect: {
            id: blogPostId,
          },
        },
      },
    });
  }
}
