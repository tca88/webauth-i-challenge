const router = require("express").Router();
const Users = require("../models/users-model.js");
// const protected = require("../auth/protected-middleware.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
