import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBlogPostDto {
  @ApiProperty({
    required: true,
    maxLength: 256,
    minLength: 3,
    example: 'My blog post',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @ApiProperty({
    required: true,
    maxLength: 512,
    minLength: 3,
    example: 'My blog post content',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  content: string;
}
