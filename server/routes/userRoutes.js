/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { extractNameFromURL, remPrefix } = require("../helpers/dataProcessor");

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
          console.log("req.session.userId", req.session.userId);
          return res.status(200).send("Authenticated!");
        } else {
          return res.status(401).send("Login failed!");
        }
      })
      .catch((e) => res.json(e));
  });

  router.post("/logout", (req, res) => {
    const userId = req.session.userId;
    if (userId) {
      req.session = null;
      return res.status(200).send("Logout Successful");
      // This return is giving a console error when trying to logout
    } else {
      return res
        .status(409)
        .send("Cannot logout a user that is not signed in.");
    }
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

  router.put("/adjust_quota", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).send("You must be signed in!");
    }
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
  router.post("/blacklists/add", (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }

    const { host_name } = req.body;
    const URL = remPrefix(host_name);

    let website;
    dbHelper
      .getWebsiteIDByHostname(URL)
      .then((site) => {
        if (!site) {
          const name = extractNameFromURL(URL);
          const category = null;
          console.log("name", name);
          // Creating the website in the database before it can be added to their blacklist
          dbHelper
            .addWebsite(URL, name, category)
            .then((site) => {
              console.log("site", site);
              return dbHelper.addWebsiteToBlacklist(userId, site.id);
            })
            .then((blacklistedSite) => {
              console.log("blacklistedSite", blacklistedSite);
              return dbHelper.getBlacklistedSiteByWebsiteId(
                blacklistedSite.website_id,
                userId
              );
            })
            .then((website) => {
              console.log("website", website);
              res.status(201).json(website);
            })
            .catch((err) => res.status(500).json(err));
        } else {
          dbHelper
            .getBlacklistedSiteByWebsiteId(site.id, userId)
            .then((websiteScoped) => {
              if (websiteScoped.enabled) {
                return res.status(400).send;
              } else {
                website = websiteScoped;
                return dbHelper
                  .enableBlacklistedSite(websiteScoped.website_id, userId)
                  .then(() => {
                    res.status(201).json(website);
                  });
              }
            })

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
    dbHelper.disableWebsiteInBlacklist(id, userId).then((resp) => {
      res.status(200).json(resp);
    });
  });

  //   // Just a test route to test db queries and response
  router.get("/test", (req, res) => {
    // const { host_name } = req.body;

    const host_name = "www.google.com";
    const URL = remPrefix(host_name);
    const userId = 1;
    dbHelper
      .getWebsiteIDByHostname(URL)
      .then((site) => {
        if (!site) {
          console.log("=====> Website does not exist yet DB, adding to db");
          const name = extractNameFromURL(URL);
          const category = null;
          dbHelper.addWebsite(URL, name, category).then((site) => {
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
      .then(() => res.send(`${URL} added to blacklist`))
      .catch((err) => res.status(400).json(err));
  });

  return router;
};
