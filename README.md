# TODO_APP

## Instalation
after installing postgres and typeorm to setup the project we need to install this dependencies:

``npm install @nestjs/typeorm typeorm pg @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt``

@nestjs/typeorm: Integrates TypeORM with NestJS.

typeorm: to interact with PostgreSQL.

pg: The PostgreSQL driver for Node.js.

@nestjs/jwt: Provides JWT (JSON Web Token) utilities for authentication.

@nestjs/passport: Integrates Passport.js (authentication middleware) with NestJS.

passport and passport-jwt: Used for JWT-based authentication.

bcrypt: Used to hash passwords securely.

## Configuration

since this is a todo app so all i need is a users table to store user's info, and another for tasks to store the tasks created by the user, and they will have a forein key of a one-to-many relationship which indicates that one user can have multiple tasks.
in order to create the tables we use this command ``sudo -u postgres psql``
I created tables in PostgreSQL and defined their structure as follows:

//secreenshot-1

1. What is an ORM, and Why Use TypeORM?
Explanation:
ORM (Object-Relational Mapper): A tool that lets you interact with a database using objects in your code (e.g., TypeScript classes) instead of writing raw SQL queries.

### Why Use TypeORM?:

1. Simplifies database interactions by abstracting SQL.

2. Works well with TypeScript, providing strong typing and decorators.

3. Supports multiple databases.

4. Automatically generates SQL queries based on your entities.

Entities: Classes that map to database tables. Each instance of an entity represents a row in the table.

Decorators: Special TypeScript annotations (e.g., @Entity, @Column) that define how a class or property maps to the database.

### Backend Workflow: How Requests Are Processed

#### Request Flow:

A request is received by a controller.

The controller calls a service to handle the business logic.

The service interacts with the database using TypeORM.

The service returns the result to the controller, which sends a response to the client.

### Explanation:
    SERIAL: Automatically increments the id field (used for primary keys).

    VARCHAR(100): A string field with a maximum length of 100 characters.

    NOT NULL: Ensures the field cannot be empty.

    UNIQUE: Ensures the field value is unique across the table.

    REFERENCES users(id): Creates a foreign key relationship between tasks.user_id and users.id.

    ON DELETE CASCADE: Automatically deletes tasks when the associated user is deleted.


## Database Schema Documentation

### Tables

#### `users`
- **Description**: Stores user information.
- **Fields**:
  - `id` (Primary Key, SERIAL): Unique identifier for each user.
  - `name` (VARCHAR(100), NOT NULL): User’s name.
  - `email` (VARCHAR(100), UNIQUE, NOT NULL): User’s email address.
  - `password` (VARCHAR(100), NOT NULL): User’s hashed password.

#### `tasks`
- **Description**: Stores tasks created by users.
- **Fields**:
  - `id` (Primary Key, SERIAL): Unique identifier for each task.
  - `title` (VARCHAR(100), NOT NULL): Title of the task.
  - `description` (TEXT): Detailed description of the task.
  - `user_id` (INT, FOREIGN KEY): References `users.id` to associate a task with a user.

### Relationships

#### One-to-Many
- **Description**: A single user can have many tasks.
- **Implementation**: The `tasks` table has a `user_id` field that references the `id` field in the `users` table.

## Steps:

We use entities to structure our database.

We can create tables using typeORM entites only if we have synchronize: true, but it seems like a bad practice so i didn't use it.

We update the AppModule to include the User entity so that TypeORM can recognize it and map it to the existing users table.

We generate the User module to organize all user-related functionality (services, controllers) in one place, we do the following command ``nest generate module user``

The user.module.ts file is necessary to organize and register the User module with NestJS.

We generate the User controller to handle HTTP requests related to users (registration, login).

We update the UserModule to include the User entity so that it can be injected into the UserService.

We inject the User repository into the UserService to enable database operations (creating/finding users).

Injecting the Repository:
TypeORM provides the @InjectRepository() decorator to inject a repository into a service.
This decorator tells TypeORM to provide an instance of the Repository class for the specified entity (e.g., User).

- Why Not Directly Use the Entity Manager?
You might wonder why we don’t just use the EntityManager directly. Here’s why:

Entity Manager:
The EntityManager is a more general-purpose tool for interacting with the database.

It can work with any entity but doesn’t provide entity-specific methods.

Repository:
The Repository is entity-specific and provides methods tailored to the entity (e.g., User).

It’s more convenient and expressive for working with a specific table.

We implemente a method in the UserService to handle user registration

We implemente a ``POST /user/register`` endpoint in the UserController to handle user registration requests. This will call the createUser method in the UserService.

In the CreateUserDto, we define the structure of the registration request, which means it makes sure that the data received is in format expected

We add a method to the UserService to handle user login. This will check if the provided email and password match a user in the database.

We implemente a ``POST /user/login`` endpoint in the UserController to handle user login requests. This will call the validateUser method in the UserService.

We set up JWT (JSON Web Token) authentication for this application. This involves:
    1. Generating a JWT when the user logs in.
    2. Securing endpoints using JWT.

### JWT:

1. Install Required Packages
    First we install the necessary packages for JWT and Passport:
        ``npm install @nestjs/jwt @nestjs/passport passport passport-jwt``
        ``npm install @types/passport-jwt --save-dev``
2. Configuration
3. creating a JWT strategy using Passport.js. This strategy will validate JWT tokens in incoming requests.
4. creating an AuthModule to organize all authentication-related components (JWT strategy, login, registration) into a single module.
5. updating the UserService and UserController to return a JWT token upon successful login.
6. updating the UserController to handle the new return type from the createUser method in the UserService.
7. creating a guard to protect specific endpoints so that only authenticated users (with a valid JWT token) can access them.
8. applying the JwtAuthGuard to additional endpoints to ensure only authenticated users can access them.

### tasks:

creating a Todo entity to represent tasks in the database.
updating the User entity to include a todos property, which establishes a one-to-many relationship with the Todo entity.