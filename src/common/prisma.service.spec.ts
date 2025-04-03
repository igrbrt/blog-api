import { Test, TestingModule } from '@nestjs/testing';

import { PrismaClient } from '@prisma/client';

import { PrismaService } from './prisma.service';

const _mockPrisma = {
  onModuleDestroy: jest.fn(),
  onModuleInit: jest.fn(),
};

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          useValue: {
            $connect: jest.fn(),
            $disconnect: jest.fn(),
          },
          provide: PrismaClient,
        },
        {
          useValue: _mockPrisma,
          provide: PrismaService,
        },
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });
});
