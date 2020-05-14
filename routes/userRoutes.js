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
        res.status(200).send("User created!");
      })
      .catch((e) => console.error(e));
  });

  // router.get("/", (req, res) => {
  //   // check users cookies to get users(id)
  //   // return null if the cookie is not found
  //   // need to use dbHelper.getUserWithID(id)
  //   // Example of using dbHelper for db queries
  //   dbHelper
  //     .getUserWithEmail("a@a.com")
  //     // .then (another query to get blacklisted websites)
  //     // .then (another query to get time_alottment) ... etc
  //     .then((user) => res.json(user))
  //     .catch((e) => res.json(e));
  // });

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
      .catch((err) => res.json(err));

    // dbHelper.addBrowseTimesToUserID(user_id, website_id, duration)
  });

  router.get("/blacklists", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    dbHelper
      .getBlacklistedSitesWithUserID(userId)
      .then((blacklists) => res.json(blacklists))
      .catch((err) => res.json(err));
  });

  // router.post("/blacklists", (req, res) => {
  //   const userId = req.session.userId;
  //   if (!userId) {
  //     return res.status(403).send("A user must be signed in!");
  //   }
  //   const { host_name } = req.body.params;
  //   dbHelper
  //     .getWebsiteIDByHostname(host_name)
  //     // .getWebsiteIDByHostname("reddit.com")
  //     .then((site) => dbHelper.addWebsiteToBlacklist(userId, site.id))
  //     .catch((err) => res.json(err));
  // });

  router.post("/blacklists/add", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    const { host_name } = req.body.params;
    const URL = remPrefix(host_name);
    dbHelper
      .getWebsiteIDByHostname(URL)
      .then((site) => {
        if (!site) {
          const name = extractNameFromURL(URL);
          const category = null;
          // Creating the website in the database before it can be added to their blacklist
          dbHelper
            .addWebsite(URL, name, category)
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

  router.put("/blacklists/disable/:id", (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    if (!userId) {
      return res.status(403).send("Please sign in first.");
    }
    dbHelper
      .disableWebsiteInBlacklist(id, userId)
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => res.status(400).json(err));
  });

  return router;
};
