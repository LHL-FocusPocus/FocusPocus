const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const { createDonutData } = require("../helpers/dataReducer");

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
      dbHelper.getBrowseInfoWithUserID(userId),
      dbHelper.getTotalTimeForTodayByUserID(userId),
      dbHelper.getTotalBlacklistTimeForTodayByUserID(userId),
    ]).then((all) => {
      // all is now an array of data that each promise returns
      userData["user"] = all[0];
      userData["quotatoday"] = all[1].time_allotment;
      userData["blacklist"] = all[2];
      //userData["donut_data"] = createDonutData(all[3]);
      userData["total_browse_time_today"] = all[4];
      userData["blacklisted_browse_time_today"] = all[5];
      return res.status(200).json(userData);
    });

    // Getting users id & name
    // dbHelper
    //   // user email is hardcoded right now, this will need to be userEmail instead.
    //   .getUserWithID(userId)
    //   .then((user) => {
    //     // res.json(user);
    //     data["first_name"] = user.first_name;
    //     data["last_name"] = user.last_name;
    //     console.log(data);
    //     return data;
    //   })
    //   // Getting users quotas for the day
    //   .then(() => {
    //     return dbHelper.getQuotaForTodayWithUserID(userId);
    //   })
    //   .then((quota) => {
    //     data["time_allotment"] = quota.time_allotment;
    //     data["date_quota_valid_from"] = quota.date_valid_from;
    //     data["date_quota_valid_until"] = quota.date_valid_until;
    //     return data;
    //   })
    //   // Getting blacklisted sites for user
    //   .then(() => {
    //     return dbHelper.getBlacklistedSitesWithUserID(userId);
    //   })
    //   .then((blacklists) => {
    //     data["blacklisted_sites"] = blacklists;
    //     return data;
    //   })
    //   // Getting total browse history recorded for user
    //   .then(() => {
    //     return dbHelper.getBrowseInfoWithUserID(userId);
    //   })
    //   .then((browse_history) => {
    //     data["browse_history"] = browse_history;
    //     return data;
    //   })
    //   // Getting total time spent today browsing for user
    //   .then(() => {
    //     return dbHelper.getTotalTimeForTodayByUserID(userId);
    //   })
    //   .then((total_time) => {
    //     data["total_browse_time_today"] = total_time;
    //     return data;
    //   })
    //   // Getting time spent today browsing blacklisted sites for user
    //   .then(() => {
    //     return dbHelper.getTotalBlacklistTimeForTodayByUserID(
    //       req.session.userId
    //     );
    //   })
    //   .then((bad_time) => {
    //     data["blacklisted_browse_time_today"] = bad_time;
    //     return data;
    //   })
    //   .then((data) => {
    //     res.send(data);
    //   })
    //   .catch((err) => res.json(err));
  });
  return router;
};
