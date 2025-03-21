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
git clone <repository-url>
cd <repository-folder>
```
### 2. Install Dependencies

```npm install -g @nestjs/cli```
```npm install -g typeorm```
```npm install @nestjs/typeorm typeorm pg @nestjs/jwt @nestjs/passport passport passport-jwt```

### 3. Set Up the Database
**1.Create the Database:**
```sudo -u postgres psql```
```CREATE DATABASE todo_db;```

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
```\q```
**3.Update the .env File:**
- Update the .env file with your JWT secret: ```JWT_SECRET=your_jwt_secret```

### 4.Start the server:
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
