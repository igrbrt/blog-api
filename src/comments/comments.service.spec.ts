jest.mock(
  'src/common/prisma.service',
  () => ({
    PrismaService: jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  'src/blog-posts/blog-posts.service',
  () => ({
    BlogPostsService: jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  './comments.repository',
  () => ({
    CommentsRepository: jest.fn(),
  }),
  { virtual: true },
);

import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { BlogPostsService } from 'src/blog-posts/blog-posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentsRepository: CommentsRepository;
  let blogPostsService: BlogPostsService;

  const mockComment = {
    id: '1',
    content: 'This is a comment',
    author: 'User Test',
    blogPostId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCommentsRepository = {
    create: jest.fn(),
  };

  const mockBlogPostsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsRepository,
          useValue: mockCommentsRepository,
        },
        {
          provide: BlogPostsService,
          useValue: mockBlogPostsService,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get(CommentsRepository);
    blogPostsService = module.get(BlogPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment successfully when blog post exists', async () => {
      const blogPostId = '1';
      const createCommentDto: CreateCommentDto = {
        content: 'This is a comment',
        author: 'User',
      };

      mockBlogPostsService.findOne.mockResolvedValue({
        id: blogPostId,
        title: 'Test Post',
        content: 'Post content',
      });

      mockCommentsRepository.create.mockResolvedValue(mockComment);

      await service.create(blogPostId, createCommentDto);

      expect(mockBlogPostsService.findOne).toHaveBeenCalledWith(blogPostId);
      expect(mockCommentsRepository.create).toHaveBeenCalledWith(
        blogPostId,
        createCommentDto,
      );
    });

    it('should throw NotFoundException when blog post does not exist', async () => {
      const blogPostId = '2';
      const createCommentDto: CreateCommentDto = {
        content: 'This is a comment',
        author: 'User Test',
      };

      mockBlogPostsService.findOne.mockRejectedValue(
        new NotFoundException(`Post not found`),
      );

      await expect(
        service.create(blogPostId, createCommentDto),
      ).rejects.toThrow(NotFoundException);

      expect(mockCommentsRepository.create).not.toHaveBeenCalled();
    });
  });
});
