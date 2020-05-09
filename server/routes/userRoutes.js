/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// req cookie sessions

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.get("/", (req, res) => {
    // check users cookies to get users(id)
    // return null if the cookie is not found
    // need to use dbHelper.getUserWithID(id)
    // Example of using dbHelper for db queries
    dbHelper
      .getUserWithID("2")
      // .then (another query to get blacklisted websites)
      // .then (another query to get time_alottment) ... etc
      .then((user) => res.json(user))
      .catch((e) => res.json(e));
  });

  return router;
};

// when returning user, also get all data related to the user.. blacklisted websites, time_allotment, etc...
//
