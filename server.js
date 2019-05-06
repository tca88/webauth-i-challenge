const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const knex = require("knex");

// const db = require("./data/dbConfig.js");

const registerRouter = require("./routers/register-router.js");
const loginRouter = require("./routers/login-router.js");
const usersRouter = require("./routers/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
