import { Comment } from '@prisma/client';

export class BlogPostResponseDto {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  commentCount?: number;
}
