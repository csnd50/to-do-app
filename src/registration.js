const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
require("dotenv").config();

class Rigestaration {
  static async checkLogged(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      // Split the Authorization header value to separate the Bearer keyword and the token
      const [bearer, token] = authHeader.split(" ");

      if (bearer === "Bearer" && token) {
        try {
          // Verify and Payload the token using the secret key
          const Payload = jwt.verify(token, process.env.SECERTKEY);
          // Pass the Payload data to the next middleware or route handler
          req.Payload = Payload;

          return next();
        } catch (error) {
          // Token verification failed
          return res.status(400).json({ message: "Invalid token" });
        }
      }
    }

    // If the token is not present or the Authorization header is not formatted correctly
    return res.status(400).json({ message: "Unauthorized" });
  }

  static async addUser(req, res) {
    const { FirstName, LastName, Email, Password, ConfirmPassword, Role } =
      req.body;

    if (!Email) {
      return res.status(400).json({ Message: "Enter the information of user" });
    }
    const user = await prisma.user.findMany({
      where: {
        Email: Email,
      },
    });
    if (user.length > 0) {
      return res.status(200).json({ Message: "User already exist" });
    }
    if (Password != ConfirmPassword) {
      return res.status(400).json({ Message: "Please confirm password" });
    } else {
      const saltRounds = parseInt(process.env.SALT_ROUNDS);

      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const user = await prisma.user.create({
          data: {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: hashedPassword,
            Role: Role,
          },
        });

        return res.status(200).json({ Message: "User created successfully" });
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ Message: "Error creating user" });
      }
    }
  }
  static async login(req, res, next) {
    const { Email, Password } = req.body;

    try {
      const user = await prisma.user.findMany({
        where: {
          Email: Email,
        },
      });

      if (user.length === 0) {
        return res.status(404).json({ Message: "Invalid Email or Password" });
      }

      const hashedPassword = user[0].Password;
      const SecertKey = process.env.SECERTKEY;
      bcrypt.compare(Password, hashedPassword, (error, result) => {
        if (error) {
          return res.status(404).json({ Message: "Invalid Email or Password" });
        } else {
          if (result) {
            // Passwords match
            const token = jwt.sign(
              {
                userId: user[0].id,
                role: user[0].Role,
              },
              SecertKey,
              { expiresIn: "7d" }
            );
            // Generate JWT
            req.token = token;
            delete req.body;
            next();
          } else {
            // Passwords do not match
            return res
              .status(400)
              .json({ Message: "Invalid Email or Password" });
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ Message: "Error during login" });
    }
  }
  static checkRole(req, res, next) {
    const { Payload } = req;

    if (Payload.role !== "ADMIN") {
      return res
        .status(400)
        .json({ Message: "Access denied. Only admins can add users." });
    }
    next();
  }
  static async updateUserInfo(req, res, next) {
    const { FName, LName, role, id } = req.body;
    const Id = parseInt(id);

    const updatedUser = await prisma.user.update({
      data: {
        FirstName: FName,
        LastName: LName,
        Role: role,
      },
      where: {
        id: Id,
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        Role: true,
      },
    });

    const { id: userId, FirstName, LastName, Role } = updatedUser;

    return res.status(200).json({
      Message: "User updated successfully",
      NewInfo: {
        id: userId,
        FirstName,
        LastName,
        Role,
      },
    });
  }

  static async deleteUser(req, res) {
    const { id } = req.body;
    const userId = parseInt(id);

    try {
      await prisma.$transaction([
        prisma.todo.deleteMany({
          where: {
            userId: userId,
          },
        }),
        prisma.user.delete({
          where: {
            id: userId,
          },
        }),
      ]);

      return res.status(200).json({ Message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ Message: "Error deleting user" });
    }
  }
}
module.exports = {
  Rigestaration,
};
