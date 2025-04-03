import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CommentsService } from 'src/comments/comments.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@Controller('posts')
export class BlogPostsController {
  constructor(
    private readonly blogPostsService: BlogPostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @ApiOkResponse()
  findAll(): Promise<BlogPostResponseDto[]> {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<BlogPostResponseDto> {
    return this.blogPostsService.findOne(id);
  }

  @Post()
  @ApiOkResponse()
  create(@Body() createPostDto: CreateBlogPostDto): Promise<void> {
    return this.blogPostsService.create(createPostDto);
  }

  @Post(':id/comments')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentsService.create(id, createCommentDto);
  }
}
