const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createTransactions: async (req, res, next) => {
    try {
      let { source_account_id, destination_account_id, amount } = req.body;
      let senderAccounts = await prisma.bank_Accounts.findUnique({
        where: { id: source_account_id },
      });
      let receiverAccounts = await prisma.bank_Accounts.findUnique({
        where: { id: destination_account_id },
      });
      if (!senderAccounts || !receiverAccounts) {
        res.status(404).json({ error: "Akun tidak ditemukan" });
        return;
      }
      if (senderAccounts.balance < amount) {
        res.status(400).json({ error: "Saldo tidak mencukupi" });
        return;
      }
      const updatedSenderBalance = senderAccounts.balance - amount;
      const updatedReceiverBalance = receiverAccounts.balance + amount;

      const transactions = await prisma.transactions.create({
        data: {
          source_account_id,
          destination_account_id,
          amount,
        },
      });

      await prisma.bank_Accounts.update({
        where: { id: source_account_id },
        data: { balance: updatedSenderBalance },
      });
      await prisma.bank_Accounts.update({
        where: { id: destination_account_id },
        data: { balance: updatedReceiverBalance },
      });
      res.json(transactions);
    } catch (err) {
      next(err);
      res.status(500).json({ error: "gagal melakukan transaksi" });
    }
  },

  indexTransactions: async (req, res, next) => {
    try {
      const result = await prisma.transactions.findMany({
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

  detailTransactions: async (req, res, next) => {
    try {
      let { id } = req.params;
      let transactions = await prisma.transactions.findUnique({ where: { id: Number(id) } });

      if (!transactions) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: `ID Transaksi tidak ditemukan ${id}`
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: transactions,
      });
    } catch (err) {
      next(err);
    }
  },

};
