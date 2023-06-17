const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

class Todo {
  //for admins
  static async addTodo(req, res) {
    const { title, id } = req.body;
    const Id = parseInt(id);
    try {
      const todo = await prisma.todo.create({
        data: {
          title: title,
          userId: Id,
        },
      });
      return res
        .status(200)
        .json({ Message: "Todo added successfuly", Todo: todo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal Error" });
    }
  }

  //for all
  static async updateTodo(req, res) {
    const { id, Status } = req.body;
    const Id = parseInt(id);
    try {
      const update = await prisma.todo.update({
        data: {
          completed: Status,
          updatedAt: new Date(),
        },
        where: {
          id: Id,
        },
      });

      return res.status(200).json({ Message: "Todo Updated", update: update });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal Error" });
    }
  }

  //for admis
  static async deleteTodo(req, res) {
    const { id } = req.body;
    const Id = parseInt(id);
    try {
      const Delete = await prisma.todo.delete({
        where: {
          id: Id,
        },
      });

      return res.status(200).json({ Message: "Todo Deleted Successfuly" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal Error" });
    }
  }

  //for all
  static async getTodos(req, res) {
    const { Payload } = req;
    try {
      if (Payload.role === "USER") {
        const userWithTodos = await prisma.user.findMany({
          where: {
            id: Payload.userId,
          },
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            Role: true,
            Todo: {
              select: {
                id: true,
                title: true,
                completed: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        });

        return res.status(200).json({ User: userWithTodos });
      }

      const usersWithTodos = await prisma.user.findMany({
        select: {
          id: true,
          FirstName: true,
          LastName: true,
          Role: true,
          Todo: {
            select: {
              id: true,
              title: true,
              completed: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return res.status(200).json({ Users: usersWithTodos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal Error" });
    }
  }
}

module.exports = {
  Todo,
};
