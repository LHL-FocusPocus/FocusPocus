const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    dbHelper
      .getUserWithEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(404).send("This email doesn't exist. Please create an account.");
        }
        if (bcrypt.compareSync(password, user.password)) {
          req.session.userId = user.id
          res.status(200)
        } else {
          res.status(403).send("Incorrect password.")
        }
      })
      .catch((e) => res.json(e));
  });

  router.post("/register", (req, res) => {
    // console.log(req.body)
    const { firstName, lastName, email, password } = req.body

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("You must fill in all the fields.");
    }
    const encryptedPassword = bcrypt.hashSync(password, 12)
    dbHelper.addUser(firstName, lastName, email, encryptedPassword)
    .then((user) => {
      if (!user) {
        return res.status(400).send("There was an issue registering.")
      }
      req.session.userId = user.id
      console.log(user.id)
    })
    .catch(e => console.error(e))
  });

  router.post("/add_browse_time", (req, res) => {
    // checking cookie session for user

    // extension will send browse time data here
    // host_name, datetime_start, duration
    const { host_name, datetime_start, duration } = req.body.params;
    // using host_name, insert website_id, datetime_start, duration, etc into the db.
  });

  return router;
};

// to do:
// POST api/blacklists/ (when users adds a site to blacklist)
// GET api/blacklists/:userID
// extension needs to POST to /api/add_browse_time/
