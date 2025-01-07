# Motor Insurance Website API

This is a NestJS-based API system for motor insurance website.

## Prerequisites

- Node.js
- Docker
- PostgreSQL

## Environment Setup

Create a `.env` file in the root directory with the following template:

```
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=MOTOR_INSURANCE_WEBSITE
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
JWT_SECRET=
```

## Installation & Setup

There are two ways to run the application:

1.  ### Using Docker

- Make sure Docker is installed on your system
- Configure the `docker-compose.yml` file:

- Fill in the required parameters:

  - `POSTGRES_HOST`
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`

- Run the application
  `docker-compose up --build`
- **Important:** Ensure environment variables in .env file match with docker-compose configuration
- Access the PostgreSQL server and execute the provided `migration.sql` file

2. ### Manual Setup

- Install dependencies
  `npm install`
- Set up PostgreSQL using Docker:

```
docker run --name [YOUR_CONTAINER_NAME] -e POSTGRES_PASSWORD=[YOUR_PASSWORD] -p 5431:5432 -d postgres
```
- Access the PostgreSQL server and execute the provided `migration.sql` file

## Running the Application

1. Start the application. The API will be available at:
   `http://localhost:3000/api`
   This will open Swagger UI with a list of available endpoints.

2. Authentication:

- Use the login API endpoint first to obtain an authentication token
- Use the received token for subsequent API requests

## API Documentation

The API documentation is available through Swagger UI at the root endpoint `(/api)`. This provides a complete list of available endpoints and their specifications.
