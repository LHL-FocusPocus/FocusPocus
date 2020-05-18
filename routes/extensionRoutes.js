const express = require("express");
const router = express.Router();

module.exports = (db, sendRefreshRequest) => {
  const dbHelper = require("../helpers/dbHelper")(db);

  router.post("/add_browse_time", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).json("A user must be signed in!");
    }

    const { hostName, durationInSeconds } = req.body;

    // Skip adding if duration was less than 5 seconds or no hostname provided
    if (!hostName || durationInSeconds < 5) {
      return res.status(400).json("Invalid data");
    }
    // Check if given hostName is in user's blacklist
    dbHelper
      .getBlacklistedSitesWithUserID(userId)
      .then((blacklists) => {
        const hostnameArray = blacklists.map((site) => site.hostname);
        if (hostnameArray.includes(hostName)) {
          dbHelper
            .getWebsiteIDByHostname(hostName)
            .then((site) => {
              return dbHelper.addBrowseTimesToUserID(
                userId,
                site.id,
                `${durationInSeconds} seconds`
              );
            })
            .then((data) => res.status(201).json(data))
            .catch((err) => res.status(500).json(err));
        } else {
          // If hostName is not in blacklist, use website_id of 0 (good site)
          dbHelper
            .addBrowseTimesToUserID(userId, 0, `${durationInSeconds} seconds`)
            .then((data) => {
              sendRefreshRequest(userId);
              res.status(201).json(data);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  return router;
};
