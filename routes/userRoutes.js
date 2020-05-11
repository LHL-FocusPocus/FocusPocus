/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.post("/login", (req, res) => {
    if (req.session.userId) {
      console.log("Your user id is:", req.session.userId);
    }
    const { email, password } = req.body;
    dbHelper
      .getUserWithEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(401).send("Login failed!");
        }
        if (bcrypt.compareSync(password, user.password)) {
          req.session.userId = user.id;
          res.status(200).send("Authenticated!");
        } else {
          res.status(401).send("Login failed!");
        }
      })
      .catch((e) => res.json(e));
  });

  router.post("/register", (req, res) => {
    // console.log(req.body)
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("You must fill in all the fields.");
    }
    const encryptedPassword = bcrypt.hashSync(password, 12);
    dbHelper
      .addUser(firstName, lastName, email, encryptedPassword)
      .then((user) => {
        if (!user) {
          return res.status(400).send("There was an issue registering.");
        }
        console.log("successful registration");
        req.session.userId = user.id;
      })
      .catch((e) => console.error(e));
  });

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
    if (!req.session.userId) {
      res.json({ Null: "Sign In" });
    } else {
      let data = {};
      // Getting users id & name
      dbHelper
        // user email is hardcoded right now, this will need to be userEmail instead.
        .getUserWithID(req.session.userId)
        .then((user) => {
          // res.json(user);
          data["first_name"] = user.first_name;
          data["last_name"] = user.last_name;
          console.log(data);
          return data;
        })
        // Getting users quotas for the day
        .then(() => {
          return dbHelper.getQuotaForTodayWithUserID(req.session.userId);
        })
        .then((quota) => {
          data["time_allotment"] = quota.time_allotment;
          data["date_quota_valid_from"] = quota.date_valid_from;
          data["date_quota_valid_until"] = quota.date_valid_until;
          return data;
        })
        // Getting blacklisted sites for user
        .then(() => {
          return dbHelper.getBlacklistedSitesWithUserID(req.session.userId);
        })
        .then((blacklists) => {
          data["blacklisted_sites"] = blacklists;
          return data;
        })
        // Getting total browse history recorded for user
        .then(() => {
          return dbHelper.getBrowseInfoWithUserID(req.session.userId);
        })
        .then((browse_history) => {
          data["browse_history"] = browse_history;
          return data;
        })
        // Getting total time spent today browsing for user
        .then(() => {
          return dbHelper.getTotalTimeForTodayByUserID(req.session.userId);
        })
        .then((total_time) => {
          data["total_browse_time_today"] = total_time;
          return data;
        })
        // Getting time spent today browsing blacklisted sites for user
        .then(() => {
          return dbHelper.getTotalBlacklistTimeForTodayByUserID(
            req.session.userId
          );
        })
        .then((bad_time) => {
          data["blacklisted_browse_time_today"] = bad_time;
          return data;
        })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => res.json(err));
    }
  });

  // Just a test route to test db queries and response
  // router.get("/test", (req, res) => {
  //   dbHelper.getQuotaForTodayWithUserID("1").then((quota) => res.json(quota));
  // });

  return router;
};

// when returning user, also get all data related to the user.. blacklisted websites, time_allotment, etc...
//
