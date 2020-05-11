/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// req cookie sessions

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.get("/", (req, res) => {
    // check users cookies to get users(id)
    // return null if the cookie is not found
    // need to use dbHelper.getUserWithID(id)
    // Example of using dbHelper for db queries
    dbHelper
      .getUserWithEmail("a@a.com")
      // .then (another query to get blacklisted websites)
      // .then (another query to get time_alottment) ... etc
      .then((user) => res.json(user))
      .catch((e) => res.json(e));
  });

  router.post("/add_browse_time", (req, res) => {
    // checking cookie session for user, get user_id

    // extension will send browse time data here
    // host_name, datetime_start, duration
    const { host_name, duration } = req.body.params;
    // using host_name, insert website_id, datetime_start, duration, etc into the db.
    let siteID;
    dbHelper
      .getWebsiteIDByHostname(host_name)
      .then((site) => (siteID = site.id))
      .then(dbHelper.addBrowseTimesToUserID(user_id, siteID, duration))
      .catch((err) => res.json(err));

    // dbHelper.addBrowseTimesToUserID(user_id, website_id, duration)
  });

  router.get("/blacklists", (req, res) => {
    // const { userID } = req.body.params;
    dbHelper
      // .getBlacklistedSitesWithUserID(userID)
      .getBlacklistedSitesWithUserID("1")
      .then((blacklists) => res.json(blacklists))
      .catch((err) => res.json(err));
  });

  router.post("/blacklists", (req, res) => {
    // const { userID, host_name } = req.body.params;
    let siteID;
    dbHelper
      // .getWebsiteIDByHostname(host_name)
      .getWebsiteIDByHostname("reddit.com")
      .then((site) => (siteID = site.id))
      .then(dbHelper.addWebsiteToBlacklist(user_id, siteID))
      .catch((err) => res.json(err));
  });

  router.get("/data", (req, res) => {
    // let userEmail;
    let data = {};
    // Getting users id & name
    dbHelper
      // user email is hardcoded right now, this will need to be userEmail instead.
      .getUserWithEmail("a@a.com")
      .then((user) => {
        // res.json(user);
        data["user_id"] = user.id;
        data["first_name"] = user.first_name;
        data["last_name"] = user.last_name;
        console.log(data);
        return data;
      })
      // Getting users quotas for the day
      .then(() => {
        return dbHelper.getQuotaForTodayWithUserID(data.user_id);
      })
      .then((quota) => {
        data["time_allotment"] = quota.time_allotment;
        data["date_quota_valid_from"] = quota.date_valid_from;
        data["date_quota_valid_until"] = quota.date_valid_until;
        return data;
      })
      // Getting blacklisted sites for user
      .then(() => {
        return dbHelper.getBlacklistedSitesWithUserID(data.user_id);
      })
      .then((blacklists) => {
        data["blacklisted_sites"] = blacklists;
        return data;
      })
      // Getting total browse history recorded for user
      .then(() => {
        return dbHelper.getBrowseInfoWithUserID(data.user_id);
      })
      .then((browse_history) => {
        data["browse_history"] = browse_history;
        return data;
      })
      // Getting total time spent today browsing for user
      .then(() => {
        return dbHelper.getTotalTimeForTodayByUserID(data.user_id);
      })
      .then((total_time) => {
        data["total_browse_time_today"] = total_time;
        return data;
      })
      // Getting time spent today browsing blacklisted sites for user
      .then(() => {
        return dbHelper.getTotalBlacklistTimeForTodayByUserID(data.user_id);
      })
      .then((bad_time) => {
        data["blacklisted_browse_time_today"] = bad_time;
        return data;
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.json(err));
  });

  // Just a test route to test db queries and response
  // router.get("/test", (req, res) => {
  //   dbHelper.getQuotaForTodayWithUserID("1").then((quota) => res.json(quota));
  // });

  return router;
};

// when returning user, also get all data related to the user.. blacklisted websites, time_allotment, etc...
//
