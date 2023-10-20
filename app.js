require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
const v1Router = require("./routes/index");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", v1Router);

const authRouter = require("./routes/auth");
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening is running on port ${PORT}`);
});
