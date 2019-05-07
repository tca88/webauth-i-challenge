const router = require("express").Router();
const Users = require("../models/users-model.js");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log("b", user.password);
      console.log("pw", password);
      console.log("bcrypt", bcrypt.compareSync(password, user.password));
      // if you find the user and compare the hash to the hash to check authentication
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ username: user.username, password: user.password });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
