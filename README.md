# NestJS Todo App

A basic NestJS app to practice backend development with PostgreSQL and TypeORM. The app includes user registration, login, and task management features.

## Features
- User registration and login with JWT authentication.
- CRUD operations for tasks.
- Modular code structure (user and todo modules).

## Technologies Used
- **NestJS**: Backend framework.
- **PostgreSQL**: Relational database.
- **TypeORM**: Object-Relational Mapping (ORM) for database management.
- **Insomnia**: API testing tool.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone git@github.com:yas-bit/TODO_APP.git
cd TODO_APP/todo
```
### 2. Install Dependencies

```npm install```
- install argon2

### 3. Set Up the Database
**1.Create the Database:**
```sudo -u postgres psql```
```CREATE DATABASE todo_db;```
connect to the database ``\c``

**2.Create tables:**
-- ```Create users table```
```CREATE TABLE users (```
  ```id SERIAL PRIMARY KEY,```
  ```name VARCHAR(100) NOT NULL,```
  ```email VARCHAR(100) UNIQUE NOT NULL,```
  ```password VARCHAR(100) NOT NULL```
```);```

-- ```Create tasks table```
```CREATE TABLE tasks (```
  ```id SERIAL PRIMARY KEY,```
 ``` title VARCHAR(100) NOT NULL,```
  ```description TEXT,```
  ```user_id INT REFERENCES users(id) ON DELETE CASCADE```
```);```
``\q``

- **Note:**
Instead of manually creating the database tables, you can define entities in TypeORM and use migrations to automatically generate and update the database schema. For example, you can create a `User` entity and a `Task` entity, then run `npm run migration:generate` and `npm run migration:run` to apply the changes to the database. This approach is more maintainable and aligns with TypeORM's best practices. For this project, I chose to manually create the tables for simplicity, but I plan to use migrations in future projects.

**3.Update the .env File:**
- Update the .env file with your JWT secret: ```JWT_SECRET=your_jwt_secret```

### 4.Start the server:
``cd todo``
```npm run start```
The server will start at http://localhost:3000.

## API Endpoints
**User Module**

``Register: POST /user/register``

Request Body:


```{```
 ``` "name": "John Doe",```
  ```"email": "john@example.com",```
  ```"password": "password123"```
```}```

Response:

```{```
  ```"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."```
```}```

``Login: POST /user/login``

Request Body:

```{```
  ```"email": "john@example.com",```
  ```"password": "password123"```
``}``

Response:

```{```
  ```"message": "Login successful",```
 ``` "results": {```
    ```"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."```
 ```}```
```}```

**Todo Module**

``Create Task: POST /todo/create``

``Get All Tasks: GET /todo/myTasks``

``Update Task: PUT /todo/update/:id``

``Delete Task: DELETE /todo/delete:id``
