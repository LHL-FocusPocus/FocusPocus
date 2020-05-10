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
          console.log("u did it");
          res.status(200)
        } else {
          return res.status(403).send("Incorrect password.")
        }
      })
      .catch((e) => res.json(e));
  });

  router.post("/register", (req, res) => {
    // checking cookie session for user

    const { first_name, last_name, email, pass /* etc.. */ } = req.body.params;
    //make a query to db to enter in the data to users table
    // dbHelper.addUser
    // if this fails then res.status(403).json to show it failed
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
