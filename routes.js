const express = require("express");
const app = express();
const { Rigestaration } = require("./registration");
const { Todo } = require("./todos");
require("dotenv").config();
app.use(express.json());

Port = process.env.PORT;
app.listen(Port, () => {});


//1- add user just for who have access to update use
app.post(
  "/adduser",
  Rigestaration.CheckLogged,
  Rigestaration.CheckRole,
  Rigestaration.SignUp
);
//2- login
app.post("/login", Rigestaration.Login, (req, res, next) => {
  res.status(200).json({ Message: "Login Successfuly", Token: req.token });
});
//3- update user info just for who have access to update users
app.post(
  "/updateuser",
  Rigestaration.CheckLogged,
  Rigestaration.CheckRole,
  Rigestaration.UpdateUserInfo
);
//4- delete Users with todos just for who have access to update users
app.post(
  "/deleteuser",
  Rigestaration.CheckLogged,
  Rigestaration.CheckRole,
  Rigestaration.DeleteUser
);
//5- add todos
app.post(
  "/addtodo",
  Rigestaration.CheckLogged,
  Rigestaration.CheckRole,
  Todo.addtodo
);

//6- update todo
app.post("/updatetodo", Rigestaration.CheckLogged, Todo.updatetodo);

//7- Delete Todo
app.post(
  "/deletetodo",
  Rigestaration.CheckLogged,
  Rigestaration.CheckRole,
  Todo.deletetodo
);

//8- Get Todos
app.get("/", Rigestaration.CheckLogged,Todo.gettodos);
