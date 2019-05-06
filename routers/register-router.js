const router = require("express").Router();
const Users = require("../models/users-model.js");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  let user = req.body;
  console.log(user);
  // check for username and password

  const hash = bcrypt.hashSync(user.password, 8); // 2^10 rounds is the number, which will take the password and then hash it.
  //round > hashit > hash the hash >  hash the hash the hash...etc. 2 to the 10th time.
  //hash the password
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
