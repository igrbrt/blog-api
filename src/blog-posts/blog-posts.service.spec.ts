jest.doMock(
  'src/common/prisma.service',
  () => {
    const mockPrismaService = {
      blogPost: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    };
    return { PrismaService: jest.fn(() => mockPrismaService) };
  },
  { virtual: true },
);

import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsRepository } from './blog-posts.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';

describe('BlogPostsService', () => {
  let service: BlogPostsService;
  let repository: BlogPostsRepository;

  const mockBlogPost = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content',
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [],
  };

  const mockBlogPosts = [
    mockBlogPost,
    {
      id: '2',
      title: 'Second Test Post',
      content: 'Content for the second test post',
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    },
  ];

  const mockRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostsService,
        {
          provide: BlogPostsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
    repository = module.get(BlogPostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog post', async () => {
      const dto: CreateBlogPostDto = {
        title: 'Test Post',
        content: 'Test Content',
      };

      await service.create(dto);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a blog post if it exists', async () => {
      mockRepository.findOne.mockResolvedValue(mockBlogPost);

      const result = await service.findOne('1');

      expect(result).toEqual(mockBlogPost);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { comments: true },
      });
    });

    it('should throw NotFoundException if blog post does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all blog posts', async () => {
      mockRepository.findAll.mockResolvedValue(mockBlogPosts);

      const result = await service.findAll();

      expect(result).toEqual(mockBlogPosts);
    });
  });

  describe('update', () => {
    it('should update a blog post', async () => {
      const updatedPost = { ...mockBlogPost, title: 'Updated Title' };
      const updateDto: CreateBlogPostDto = {
        title: 'Updated Title',
        content: 'Test Content',
      };

      mockRepository.findOne.mockResolvedValue(mockBlogPost);
      mockRepository.update.mockResolvedValue(updatedPost);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(updatedPost);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw NotFoundException when updating non-existent blog post', async () => {
      const updateDto: CreateBlogPostDto = {
        title: 'Updated Title',
        content: 'Test Content',
      };

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('999', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });
});
