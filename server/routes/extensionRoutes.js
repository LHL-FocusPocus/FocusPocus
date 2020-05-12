const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);

  router.post("/add_browse_time", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
        
    const { hostName, durationInSeconds } = req.body;

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
            .catch((err) => res.status(500).json(err));
        } else {
          // If hostName is not in blacklist, use website_id of 0 (good site)
          dbHelper
            .addBrowseTimesToUserID(userId, 0, `${durationInSeconds} seconds`)
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
