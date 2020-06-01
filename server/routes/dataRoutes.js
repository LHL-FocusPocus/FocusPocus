const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const {
    compileData,
    convertTimeObjToMinutes,
  } = require("../helpers/dataProcessor");

  // Return data needed to render dashboard, access at /data/dashboard
  router.get("/dashboard", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).json("A user must be signed in!");
    }
    let userData = {};

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
      dbHelper.getTopBlacklistedSites(),
    ])
      .then((all) => {
        // all is now an array of data that each promise returns
        userData["user"] = all[0];
        userData["quota"] = {
          allotment: convertTimeObjToMinutes(all[1].time_allotment),
          used: convertTimeObjToMinutes(all[5].sum),
          all_browse_time: convertTimeObjToMinutes(all[4].sum),
        };
        userData["blacklisted"] = all[2];
        userData["donutGraph"] = compileData(all[3], "website");
        userData["lineGraph"] = compileData(all[6], "date");
        userData["leaderboard"] = compileData(all[7], "name", "picture");
        userData["shameboard"] = compileData(all[8], "name", "picture");
        userData["radialGraph"] = all[9];
        userData["topBlacklisted"] = all[10];

        return res.status(200).json(userData);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
  return router;
};
