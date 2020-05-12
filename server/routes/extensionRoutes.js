const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  
  router.post("/add_browse_time", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }

    const { host_name, durationInSeconds } = req.body.params;

    // Check if host_name given is in user's blacklist
    dbHelper
      .getBlacklistedSitesWithUserID(userId)
      .then((blacklists) => {})
      .catch((err) => res.status(500).json(err));

    // using host_name, insert website_id, datetime_start, duration, etc into the db.
    dbHelper
      .getWebsiteIDByHostname(host_name)
      .then((site) => {
        dbHelper.addBrowseTimesToUserID(user_id, site.id, durationInSeconds);
      })
      .catch((err) => res.json(err));
  });


  return router;
};
