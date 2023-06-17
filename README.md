# Todo App API

This is a RESTful API for a Todo App built with Node.js, Express, and Prisma.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/csnd50/to-do-app.git

   ```

2. Install the dependencies:

   cd todo-app-app
   npm install

3. Set up the database:

Create a PostgreSQL database.

Set the database URL in the .env file:

DATABASE_URL=your_database_url.

Set your Port in .env file Port =3000.

Set your Secert-key in .env file   SECERTKEY="Your secert-key.

Set your Rounds in .env file   SALT_ROUNDS = 10.


4. Start the server:
   npm run devStart
   The server will start running on http://localhost:3000.

API Endpoints

    1. POST /add-user
    Description: Add a new user.
    Authentication required: Yes (admin role).

    2. POST /login

    Description: Authenticate a user and generate a JWT token.


    3. POST /update-user

    Description: Update user information.
    Authentication required: Yes (admin role).


    4. POST /delete-user

    Description: Delete a user and their associated todos.
    Authentication required: Yes (admin role).

    5. POST /add-todo

    Description: Add a new todo.
    Authentication required: Yes (admin role).

    6. POST /update-todo

    Description: Update a todo.
    Authentication required: Yes (user role).


    7. POST /delete-todo

    Description: Delete a todo.
    Authentication required: Yes (admin role).

    8. GET /

    Description: Get all todos for the authenticated user (user role) or all users and their todos (admin role).
    Authentication required: Yes
