const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);

  return router;
};

// to do:
// POST api/blacklists/ (when users adds a site to blacklist)
// GET api/blacklists/:userID
// extension needs to POST to /api/add_browse_time/
