const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createBankAccounts: async (req, res, next) => {
    try {
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let newBankAccounts = await prisma.bank_Accounts.create({
        data: {
          user_id: user_id,
          bank_name: bank_name,
          bank_account_number: bank_account_number,
          balance: balance,
        },
      });

      res.status(201).json({
        status: true,
        message: "Bank Telah Dibuat!",
        data: newBankAccounts,
      });
    } catch (err) {
      next(err);
    }
  },

  indexBankAccounts: async (req, res, next) => {
    try {
      const result = await prisma.bank_Accounts.findMany({
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

  detailBankAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;
      let bank_account = await prisma.bank_Accounts.findUnique({ where: { id: Number(id) } });

      if (!bank_account) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: "ID doesnt exist! " + id,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: bank_account,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBankAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let banks = await prisma.bank_Accounts.findUnique({ where: { id: Number(id) } });
      if (!banks) {
        return res.status(400).json({
          status: false,
          message: "ID doesnt exist!",
          data: null,
        });
      }

      let updateOperation = await prisma.bank_Accounts.update({
        where: { id: Number(id) },
        data: { user_id, bank_name, bank_account_number, balance },
      });

      res.status(200).json({
        status: true,
        message: "OK",
        data: updateOperation,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBankAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;

      let deleteOperation = await prisma.bank_Accounts.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: "Bank Telah Dihapus!",
        data: deleteOperation,
      });
    } catch (err) {
      next(err);
    }
  },
};
