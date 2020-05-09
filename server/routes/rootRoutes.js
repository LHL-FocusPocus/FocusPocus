const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.get("/", (req, res) => {
    res.json({ Hello: "World!" });
  });
  // router.get("/", (req, res) => {
  //   // Example of using dbHelper for db queries
  //   dbHelper
  //     .getUserWithEmail("a@a.com")
  //     .then((user) => res.json(user))
  //     .catch((e) => res.json(e));
  // });

  return router;
};
