const bcrypt = require("bcryptjs");

const Users = require("../models/users-model.js");

function protected(req, res, next) {
  const { username, password } = req.headers;
  console.log(req.body);
  console.log(req.headers);

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && password === user.password) {
          next();
        } else {
          res.status(401).json({
            message: "invalid credentials",
            username: user.username,
            password: user.password
          });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: "Please provide credentials" });
  }
}

module.exports = protected;
