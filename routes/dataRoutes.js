const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const {
    createDonutData,
    createChartData,
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
    ]).then((all) => {
      // all is now an array of data that each promise returns
      userData["user"] = all[0];
      userData["quota_today"] = all[1].time_allotment;
      userData["blacklisted"] = all[2];
      userData["donut_data"] = createDonutData(all[3]);
      // userData["donut_data"] = all[3];
      userData["total_browse_time_today"] = all[4];
      userData["blacklisted_browse_time_today"] = all[5];
      userData["month_blacklisted_browse_time_for_chart"] = createChartData(
        all[6]
      );
      // userData["month_browse_time_for_chart"] = all[6];

      return res.status(200).json(userData);
    });
  });
  return router;
};
