const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);

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
