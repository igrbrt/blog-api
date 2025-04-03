import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    maxLength: 512,
    minLength: 3,
    example: 'My comment',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  content: string;

  @ApiProperty({
    required: false,
    maxLength: 100,
    minLength: 2,
    example: 'Igor Barreto',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  author?: string;
}
