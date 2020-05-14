const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const { compileData } = require("../helpers/dataProcessor");

  // Return data needed to render dashboard, access at /data/dashboard
  router.get("/dashboard", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    let userData = {};

    // Promises.all implementation
    Promise.all([
      dbHelper.getUserWithID(userId),
      dbHelper.getQuotaForTodayWithUserID(userId),
      dbHelper.getBlacklistedSitesWithUserID(userId),
      dbHelper.getBrowseInfoTodayForDashboard(userId),
      dbHelper.getTotalTimeForTodayByUserID(userId),
      dbHelper.getTotalBlacklistTimeForTodayByUserID(userId),
      dbHelper.getMonthBlacklistBrowsingInfoForChart(userId),
      dbHelper.getTimeForLeaderboardWeek(),
      dbHelper.getTimeForShameboardWeek(),
      dbHelper.getHitsForBlacklistedSiteForPastWeek(userId),
    ]).then((all) => {
      // all is now an array of data that each promise returns
      userData["user"] = all[0];
      userData["quota_today"] = {
        allotment: all[1].time_allotment,
        used: all[5].sum,
        all_browse_time: all[4].sum,
      };
      userData["blacklisted"] = all[2];
      userData["radialGraph"] = all[9];
      userData["donutGraph"] = compileData(all[3], "website");
      userData["lineGraph"] = compileData(all[6], "date");
      userData["leaderboard"] = compileData(all[7], "name");
      userData["shameboard"] = compileData(all[8], "name");

      return res.status(200).json(userData);
    })
    .catch(err => console.error(err))
  });
  return router;
};
