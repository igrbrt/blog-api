import { forwardRef, Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { CommonModule } from 'src/common/common.module';
import { BlogPostsRepository } from './blog-posts.repository';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostsService, BlogPostsRepository],
  exports: [BlogPostsService],
  imports: [CommonModule, forwardRef(() => CommentsModule)],
})
export class BlogPostsModule {}
