import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostsRepository } from './blog-posts.repository';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';

@Injectable()
export class BlogPostsService {
  constructor(private readonly blogPostsRepository: BlogPostsRepository) {}

  async create(createPostDto: CreateBlogPostDto): Promise<void> {
    return await this.blogPostsRepository.create(createPostDto);
  }

  async findOne(id: string): Promise<BlogPostResponseDto> {
    const blogPost = await this.blogPostsRepository.findOne({
      where: { id },
      include: {
        comments: true,
      },
    });

    if (!blogPost) {
      throw new NotFoundException(`Post not found`);
    }

    return blogPost;
  }

  async findAll(): Promise<BlogPostResponseDto[]> {
    return await this.blogPostsRepository.findAll();
  }

  async update(
    id: string,
    updatePostDto: CreateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    await this.findOne(id);
    return await this.blogPostsRepository.update(id, updatePostDto);
  }
}
