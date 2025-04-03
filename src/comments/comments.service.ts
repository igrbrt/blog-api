import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { BlogPostsService } from 'src/blog-posts/blog-posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly blogPostsService: BlogPostsService,
  ) {}

  async create(
    blogPostId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.blogPostsService.findOne(blogPostId);
    await this.commentsRepository.create(blogPostId, createCommentDto);
  }
}
