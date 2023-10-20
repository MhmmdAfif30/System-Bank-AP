const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createUsers: async (req, res, next) => {
    try {
      let { name, email, password } = req.body;

      let newUsers = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });

      res.status(201).json({
        status: true,
        message: "User Telah Dibuat!",
        data: newUsers,
      });
    } catch (err) {
      next(err);
    }
  },

  indexUsers: async (req, res, next) => {
    try {
      const result = await prisma.users.findMany({
        orderBy: {
          id: "asc",
        },
      });

      res.status(200).json({
        status: true,
        message: "OK!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  detailUsers: async (req, res, next) => {
    try {
      let { id } = req.params;
      let users = await prisma.users.findUnique({ where: { id: Number(id) } });

      if (!users) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: "No Users Found With Id " + id,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteUsers: async (req, res, next) => {
    try {
      let { id } = req.params;

      let deleteOperation = await prisma.users.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: "Users Telah Dihapus!",
        data: deleteOperation,
      });
    } catch (err) {
      next(err);
    }
  },

};
