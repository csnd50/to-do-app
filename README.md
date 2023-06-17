<<<<<<< HEAD

# Todo App API

This is a RESTful API for a Todo App built with Node.js, Express, and Prisma.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/csnd50/to-do-app.git

   ```

2. Install the dependencies:

   cd todo-app-api
   npm install

3. Set up the database:

Create a PostgreSQL database.

Set the database URL in the .env file:

DATABASE_URL=your_database_url.

Set your Port in .env file.
Set your Secert-key in .env file.
Set your Rounds in .env file.

4. Start the server:
   npm run devStart
   The server will start running on http://localhost:3000.

API Endpoints

    POST /adduser
    Description: Add a new user.
    Authentication required: Yes (admin role).

    POST /login

    Description: Authenticate a user and generate a JWT token.


    POST /updateuser

    Description: Update user information.
    Authentication required: Yes (admin role).


    POST /deleteuser

    Description: Delete a user and their associated todos.
    Authentication required: Yes (admin role).

    POST /addtodo

    Description: Add a new todo.
    Authentication required: Yes (admin role).

    POST /updatetodo

    Description: Update a todo.
    Authentication required: Yes (user role).


    POST /deletetodo

    Description: Delete a todo.
    Authentication required: Yes (admin role).

    GET /

    Description: Get all todos for the authenticated user (user role) or all users and their todos (admin role).
    Authentication required: Yes
