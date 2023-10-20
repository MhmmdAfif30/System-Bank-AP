const express = require("express");
const router = express.Router();
const { register, login, whoami } = require("../controllers/auth");
const {restrict} = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/whoami", restrict, whoami);

module.exports = router;
