import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommonModule } from 'src/common/common.module';
import { BlogPostsModule } from 'src/blog-posts/blog-posts.module';
import { CommentsRepository } from './comments.repository';

@Module({
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
  imports: [CommonModule, forwardRef(() => BlogPostsModule)],
})
export class CommentsModule {}
