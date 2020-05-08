const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.get("/", (req, res) => {
    res.json({Hello: "World!"});
  });


  return router;
};
