const express = require("express");
const router = express.Router();

const { createUsers, detailUsers, indexUsers, deleteUsers} = require("../handlers/v1/users");
const {createBankAccounts,indexBankAccounts,detailBankAccounts,updateBankAccounts,deleteBankAccounts} = require("../handlers/v1/bank_accounts");
const {createTransactions, indexTransactions,detailTransactions} = require("../handlers/v1/transactions");

//membuat users
router.post("/users", createUsers);
// melihat semua users
router.get("/users", indexUsers);
//detail users
router.get("/users/:id", detailUsers);
// hapus users
router.delete("/users/:id", deleteUsers);

//membuat akun bank
router.post("/bank_accounts", createBankAccounts);
//melihat semua akun bank
router.get("/bank_accounts", indexBankAccounts);
//melihat detail bank
router.get("/bank_accounts/:id", detailBankAccounts);
//update bank
router.put("/bank_accounts/:id", updateBankAccounts);
//delete bank
router.delete("/bank_accounts/:id", deleteBankAccounts);

//membuat transaksi
router.post("/transactions", createTransactions);
router.get("/transactions", indexTransactions);
router.get("/transactions/:id", detailTransactions);

module.exports = router;
