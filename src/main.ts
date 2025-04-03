import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('A RESTful API for managing a simple blogging platform')
    .setVersion('1.0')
    .addTag('posts')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/documentation', app, document);
    console.log(
      `Swagger documentation available: http://localhost:${port}/api/documentation`,
    );
  }

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
