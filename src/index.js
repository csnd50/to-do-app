const express = require("express");
const app = express();
const { Rigestaration } = require("./registration");
const { Todo } = require("./todos");
require("dotenv").config();
app.use(express.json());

const Port = process.env.PORT;
app.listen(Port, () => {});


//1- add user 
app.post(
  "/add-user",
  Rigestaration.checkLogged,
  Rigestaration.checkRole,
  Rigestaration.addUser
);
//2- login
app.post("/login", Rigestaration.login, (req, res, next) => {
  res.status(200).json({ Message: "Login Successfuly", Token: req.token });
});
//3- update user 
app.post(
  "/update-user",
  Rigestaration.checkLogged,
  Rigestaration.checkRole,
  Rigestaration.updateUserInfo
);
//4- delete Users with todos 
app.post(
  "/delete-user",
  Rigestaration.checkLogged,
  Rigestaration.checkRole,
  Rigestaration.deleteUser
);
//5- add todos
app.post(
  "/add-todo",
  Rigestaration.checkLogged,
  Rigestaration.checkRole,
  Todo.addTodo
);

//6- update todo
app.post("/update-todo", Rigestaration.checkLogged, Todo.updateTodo);

//7- Delete Todo
app.post(
  "/delete-todo",
  Rigestaration.checkLogged,
  Rigestaration.checkRole,
  Todo.deleteTodo
);

//8- Get Todos
app.get("/", Rigestaration.checkLogged,Todo.getTodos );
