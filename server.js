const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const authRouter = require("./routers/auth-router.js");
const usersRouter = require("./routers/users-router.js");

const server = express();

const sessionConfig = {
  // Step 2 - create objext
  name: "sid", // by default would be session id
  secret: "sssshhh",
  cookie: {
    httpOnly: true, // true means prevent access from JavaScript code
    maxAge: 1000 * 60 * 1, // in miliseconds
    secure: false // true means only send cookie over https
  },
  resave: false, // resave session even if it didn't change
  saveUninitialized: true // create new sessions automatically, make sure to comply with law
};

server.use(session(sessionConfig)); // Step 3
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  const username = req.session.username || "stranger";
  res.send(`Hello ${username}`);
});

module.exports = server;
