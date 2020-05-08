/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.get("/", (req, res) => {
    // Example of using dbHelper for db queries
    dbHelper
      .getUserWithEmail("a@a.com")
      .then((user) => res.json(user))
      .catch((e) => res.json(e));
  });

  return router;
};
