const router = require("express").Router();
const Users = require("../models/users-model.js");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // console.log("b", user.password);
      // console.log("pw", password);
      // console.log("bcrypt", bcrypt.compareSync(password, user.password));
      // if you find the user and compare the hash to the hash to check authentication
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
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

router.get("/logout", (req, res) => {
  // server keeps track of all of the valid sessions
  if (req.session) {
    // is the person even logged in?
    req.session.destroy(err => {
      if (err) {
        res.send(
          "you can checkout any time you like, but you can never leave..."
        );
      } else {
        res.send("bye");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
