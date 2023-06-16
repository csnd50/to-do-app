# Todo App API

This is a RESTful API for a Todo App built with Node.js, Express, and Prisma.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/csnd50/TO-DO-APP.git

2. Install the dependencies:

    cd todo-app-api
    npm install

3. Set up the database:

Create a PostgreSQL database.

Set the database URL in the .env file:

DATABASE_URL=your_database_url

4. Start the server:
    npm run devStart
The server will start running on http://localhost:3000.

API Endpoints

    POST /adduser
    Description: Add a new user.
    Authentication required: Yes (admin role).
    Request body:

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "johndoe@example.com",
  "Password": "password123",
  "ConfirmPassword": "password123",
  "Role": "USER"
}

Response:

{
  "Message": "User created successfully"
}

POST /login

Description: Authenticate a user and generate a JWT token.
Request body:
{
  "Email": "johndoe@example.com",
  "Password": "password123"
}

Response:
{
  "Message": "Login Successfuly",
  "Token": "your_token"
}

POST /updateuser

Description: Update user information.
Authentication required: Yes (admin role).
Request body:

{
  "FName": "John",
  "LName": "Smith",
  "role": "ADMIN"
}

Response:
{
  "Message": "User updated successfully",
  "NewInfo": {
    "id": 1,
    "FirstName": "John",
    "LastName": "Smith",
    "Role": "ADMIN"
  }
}

POST /deleteuser

Description: Delete a user and their associated todos.
Authentication required: Yes (admin role).
Request body:

{
  "id": 1
}
Response:
{
  "Message": "User deleted successfully"
}


POST /addtodo

Description: Add a new todo.
Authentication required: Yes (admin role).
Request body:
{
  "title": "Finish project",
  "id": 1
}

Response:
{
  "Message": "Todo added successfully",
  "Todo": {
    "id": 1,
    "title": "Finish project",
    "completed": false,
    "createdAt": "2023-06-15T12:00:00Z",
    "updatedAt": "2023-06-15T12:00:00Z"
  }
}

POST /updatetodo

Description: Update a todo.
Authentication required: Yes (user role).
Request body:
{
  "id": 1,
  "Status": true
}
Response:
{
  "Message": "Todo Updated",
  "update": {
    "id": 1,
    "title": "Finish project",
    "completed": true,
    "createdAt": "2023-06-15T12:00:00Z",
    "updatedAt": "2023-06-15T12:30:00Z"
  }
}

POST /deletetodo

Description: Delete a todo.
Authentication required: Yes (admin role).
Request body:
{
  "id": 1
}
Response:
{
  "Message": "Todo Deleted Successfully"
}

GET /

Description: Get all todos for the authenticated user (user role) or all users and their todos (admin role).
Authentication required: Yes
Response (for user role):
{
  "User": {
    "id": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "Role": "USER",
    "Todo": [
      {
        "id": 1,
        "title": "Finish project",
        "completed": true,
        "createdAt": "2023-06-15T12:00:00Z",
        "updatedAt": "2023-06-15T12:30:00Z"
      }
    ]
  }
}

Response (for admin role):
{
  "Users": [
    {
      "id": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "Role": "USER",
      "Todo": [
        {
          "id": 1,
          "title": "Finish project",
          "completed": true,
          "createdAt": "2023-06-15T12:00:00Z",
          "updatedAt": "2023-06-15T12:30:00Z"
        }
      ]
    },
        {
      "id": 1,
      "FirstName": "John",
      "LastName": "leo",
      "Role": "USER",
      "Todo": [
        {
          "id": 1,
          "title": "Finish project",
          "completed": true,
          "createdAt": "2023-06-15T12:00:00Z",
          "updatedAt": "2023-06-15T12:30:00Z"
        }
      ]
    },
        {
      "id": 1,
      "FirstName": "John",
      "LastName": "smith",
      "Role": "AMDIN",
      "Todo": [
        {
          "id": 1,
          "title": "Finish project",
          "completed": true,
          "createdAt": "2023-06-15T12:00:00Z",
          "updatedAt": "2023-06-15T12:30:00Z"
        }
      ]
    },
  ]
}




