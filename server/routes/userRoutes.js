/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { extractNameFromURL } = require("../helpers/dataProcessor");

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
        res.status(200).send("User created!");
      })
      .catch((e) => console.error(e));
  });

  router.post("/add_browse_time", (req, res) => {
    // checking cookie session for user, get user_id
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }

    // extension will send browse time data here
    // host_name, datetime_start, duration
    const { host_name, duration } = req.body.params;
    // using host_name, insert website_id, datetime_start, duration, etc into the db.
    dbHelper
      .getWebsiteIDByHostname(host_name)
      .then((site) => {
        dbHelper.addBrowseTimesToUserID(user_id, site.id, duration);
      })
      .catch((err) => res.status(400).json(err));
  });

  // Retrieving a user's blacklisted sites
  router.get("/blacklists", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    dbHelper
      .getBlacklistedSitesWithUserID(userId)
      .then((blacklists) => res.json(blacklists))
      .catch((err) => res.status(400).json(err));
  });

  // When a user wants to add a site to their blacklist
  router.post("/blacklists", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    const { host_name } = req.body.params;
    dbHelper
      .getWebsiteIDByHostname(host_name)
      .then((site) => {
        if (!site) {
          const name = extractNameFromURL(host_name);
          const category = null;
          // Creating the website in the database before it can be added to their blacklist
          dbHelper
            .addWebsite(host_name, name, category)
            .then((site) => {
              return dbHelper.addWebsiteToBlacklist(userId, site.id);
            })
            .then((blacklist) => res.status(201).json(blacklist))
            .catch((err) => res.status(500).json(err));
        } else {
          dbHelper
            .addWebsiteToBlacklist(userId, site.id)
            .then((blacklist) => res.status(201).json(blacklist))
            .catch((err) => res.status(500).json(err));
        }
      })
      .catch((err) => res.status(400).json(err));
  });

  // Need to make a route to remove from user's blacklist

  //   // Just a test route to test db queries and response
  router.get("/test", (req, res) => {
    // const { host_name } = req.body.params;
    const host_name = "google.com";
    const userId = 1;
    dbHelper
      .getWebsiteIDByHostname(host_name)
      .then((site) => {
        if (!site) {
          console.log("=====> Website does not exist yet DB, adding to db");
          // Removes '.com' from end of hostname for DB.
          const remSuffix = host_name.split(".")[0];
          // Capitalizes first letter of hostname
          const name = remSuffix.charAt(0).toUpperCase() + remSuffix.slice(1);
          const category = null;
          dbHelper.addWebsite(host_name, name, category).then((site) => {
            console.log("=====> Adding a new site to blacklist");
            console.log(site);
            return dbHelper.addWebsiteToBlacklist(userId, site.id);
          });
        } else {
          console.log("=====> Website exists in database");
          console.log("=====> Adding an old site to this user's blacklist");
          return dbHelper.addWebsiteToBlacklist(userId, site.id);
        }
      })
      .then(() => res.send(`${host_name} added to blacklist`))
      .catch((err) => res.status(400).json(err));
  });

  return router;
};
