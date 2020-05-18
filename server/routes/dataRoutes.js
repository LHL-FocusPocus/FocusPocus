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

    // Promises.all implementation
    Promise.all([
      // 0
      dbHelper.getUserWithID(userId),
      // 1
      dbHelper.getQuotaForTodayWithUserID(userId),
      // 2
      dbHelper.getBlacklistedSitesWithUserID(userId),
      // 3
      dbHelper.getBrowseInfoTodayForDashboard(userId),
      // 4
      dbHelper.getTotalTimeForTodayByUserID(userId),
      // 5
      dbHelper.getTotalBlacklistTimeForTodayByUserID(userId),
      // 6
      dbHelper.getMonthBlacklistBrowsingInfoForChart(userId),
      // 7
      dbHelper.getTimeForLeaderboardWeek(),
      // 8
      dbHelper.getTimeForShameboardWeek(),
      // 9
      dbHelper.getHitsForBlacklistedSiteForPastWeek(userId),
      // 10
      dbHelper.getTopBlacklistedSites(),
      // 11
      dbHelper.getAcceptedFriends(),
    ])
      .then((all) => {
        // all is now an array of data that each promise returns
        userData["user"] = all[0];
        userData["quota_today"] = {
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
        userData["friendsList"] = all[11];
        return res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
  return router;
};
