# Blog API - Code Challenge

RESTful API for managing a simple blog platform, developed with NestJS, TypeScript, Prisma, and PostgreSQL.

## Technologies Used

- **NestJS**: Framework for building server-side applications
- **TypeScript**: Typed programming language
- **Prisma**: ORM (Object-Relational Mapping) for database access
- **PostgreSQL**: Relational database
- **Docker**: Containerization for the database

## Features

The API offers the following endpoints:

- **GET /api/posts**: Returns a list of all posts with titles and comment counts
- **POST /api/posts**: Creates a new blog post
- **GET /api/posts/{id}**: Retrieves a specific post by ID, including its comments
- **POST /api/posts/{id}/comments**: Adds a new comment to a specific post

## Setup and Execution

### Prerequisites

- Node.js (v16+)
- Docker and Docker Compose
- pnpm

### Execution Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd blog-api
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start the database with Docker**:

   ```bash
   docker-compose up -d
   ```

4. **Configure the environment**:
   The application uses an `.env` file with the following configuration (copy from env.example):

   ```
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog_db?schema=public"
   PORT=3000
   ```

5. **Generate the Prisma client and create tables**:

   ```bash
   pnpm run prisma:generate
   pnpm run prisma:migrate
   ```

6. **Start the application**:

   ```bash
   pnpm run start:dev
   ```

7. **Access the API**:
   
   The API will be available at `http://localhost:3000/api`

8. **Access the API Documentation**:
    
   The documentation will be available at `http://localhost:3000/api/documentation`

11. **Running tests**:
   ```bash
   pnpm test
   ```

![image](https://github.com/user-attachments/assets/73b61b7f-3dd8-453b-b58a-23ce2225d0ad)

![image](https://github.com/user-attachments/assets/4e0b4a18-985d-4ec9-b903-2a6b3218ec01)

![image](https://github.com/user-attachments/assets/429fb21a-4cec-4b16-a63a-1270087dbe03)



## Data Models

### BlogPost

- **id**: string (UUID)
- **title**: string
- **content**: string
- **createdAt**: Date
- **updatedAt**: Date

### Comment

- **id**: string (UUID)
- **content**: string
- **author**: string (optional)
- **blogPostId**: string (reference to BlogPost)
- **createdAt**: Date
- **updatedAt**: Date

## Project Structure

```
blog-api/
├── prisma/
│   ├── migrations        # Prisma migrations
│   └── schema.prisma     # Prisma schema
├── src/
│   ├── blog-posts/       # Posts module
│   ├── comments/         # Comments module
│   ├── common/           # Module for Prisma and possible shared files
│   ├── app.module.ts     # Main module
│   └── main.ts           # Entry point
├── docker-compose.yml    # Docker configuration
├── .env                  # Environment variables
└── package.json
```
