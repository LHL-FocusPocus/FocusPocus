const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const {
    createDonutData,
    createChartData,
    createBoardData,
    toMinutes,
  } = require("../helpers/dataProcessor");

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
    ]).then((all) => {
      // all is now an array of data that each promise returns
      userData["user"] = all[0];
      userData["quota_today"] = {
        "allotment": all[1].time_allotment,
        "used": all[5].sum
      }
      userData["all_browse_time_today"] = all[4].sum;
      userData["blacklisted"] = all[2];
      userData["donutGraph"] = createDonutData(all[3]);
      userData["lineGraph"] = createChartData(all[6]);
      userData["leaderboard"] = createBoardData(all[7]);
      userData["shameboard"] = createBoardData(all[8]);

      return res.status(200).json(userData);
    });
  });
  return router;
};
