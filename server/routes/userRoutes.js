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
      // This return was giving a console error when trying to logout because the res.status was a 400 code
    } else {
      return res
        .status(409)
        .send("Cannot logout a user that is not signed in.");
    }
  });

  router.post("/register", (req, res) => {
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
      .then((user) => {
        dbHelper.getUserWithID(req.session.userId).then((user) => {});
      })
      .catch((e) => console.error(e));
  });

  /**
   * Automatically handles adding appropriate quota entries based on starting
   * quota, increment, and target quota
   */
  router.post("/adjust_quota", (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(403).send("You must be signed in!");
    }
    const { quotaStart, quotaIncrement, quotaTarget } = req.body;    
    if (
      !(
        (quotaStart || quotaStart === 0) &&
        (quotaIncrement || quotaIncrement === 0) &&
        (quotaTarget || quotaTarget === 0)
      )
    ) {
      return res.status(400).json("Invalid request");
    }
    const optionsObj = { quotaStart, quotaIncrement, quotaTarget };
    // User wants a static quota
    if (quotaIncrement === 0) {
      dbHelper
        .addStaticQuota(userId, `${quotaStart} minutes`)
        .then(() => {
          // Update the user's option to reflect their choice
          return dbHelper.updateUserOptionQuota(userId, optionsObj);
        })
        .then((user) => res.status(201).json(user))
        .catch((e) => {
          console.error(e);
          return res.status(500).json(e);
        });
    } else if (quotaTarget >= quotaStart) {
      return res
        .status(400)
        .json("Target quota must be lower than starting quota!");
    } else {
      // Handle adding multiple quotas
      let i = 0;
      for (
        let quota = quotaStart;
        quota > quotaTarget;
        quota -= quotaIncrement
      ) {
        dbHelper
          .addQuotaWithDate(
            userId,
            `${quota} minutes`,
            `CURRENT_DATE + INTERVAL '${i} day'`,
            `CURRENT_DATE + INTERVAL '${i + 1} day'`
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
        i++;
      }
      // Add a final query with infinity datetime_start
      dbHelper
        .addQuotaWithDate(
          userId,
          `${quotaTarget} minutes`,
          `CURRENT_DATE + INTERVAL '${i} day'`,
          `'INFINITY'`
        )
        .then(() => {
          // Update the user's option to reflect their choice
          return dbHelper.updateUserOptionQuota(userId, optionsObj);
        })
        .then((user) => res.status(201).json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
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
    // Get the website, then add site to the db, then blacklist it for the user
    dbHelper
      .getWebsiteIDByHostname(URL)
      .then((site) => {
        // If the website DOES NOT exist in the db, run this if block: add the website, add to users blacklist, then return the data
        if (!site) {
          const name = extractNameFromURL(URL);
          const category = null;
          dbHelper
            .addWebsite(URL, name, category)
            .then((site) => {
              // console.log("Adding website to blacklist=====>", userId, site.id);
              return dbHelper.addWebsiteToBlacklist(userId, site.id);
            })
            .then((blacklistedSite) => {
              // console.log(
              //   "Getting blacklisted site by website ID ======>",
              //   userId,
              //   blacklistedSite.website_id
              // );

              return dbHelper.getBlacklistedSiteByWebsiteId(
                blacklistedSite.website_id,
                userId
              );
              // return dbHelper.getBlacklistedSitesWithUserID(userId);
            })
            .then((website) => {
              return res.status(201).json(website);
            })
            .catch((err) => res.status(500).json(err));
        } else {
          // If the website exists in the database, use its ID to see if it's
          // already in the user's blacklist, in which case its flag must be set
          // to enabled
          dbHelper
            .getBlacklistedSiteByWebsiteId(site.id, userId)
            // .getBlacklistedSitesWithUserID(userId)
            .then((websiteScoped) => {
              // If website already in user's blacklist, set its flag to enabled
              if (websiteScoped) {
                if (websiteScoped.enabled) {
                  // User is trying to add something already enabled
                  return res.status(409).json("Already on blacklist!");
                } else {
                  website = websiteScoped;
                  return dbHelper
                    .enableBlacklistedSite(websiteScoped.website_id, userId)
                    .then(() => {
                      console.log(
                        "Enabling blacklisted site",
                        userId,
                        websiteScoped.website_id
                      );

                      return res.status(201).json(website);
                    })
                    .catch((err) => res.status(500).json(err));
                }
              }
              // If the website exists in the db, but has never been on user's
              // blacklist, then add it to the user's blacklist
              else if (!websiteScoped) {
                dbHelper
                  .addWebsiteToBlacklist(userId, site.id)
                  .then((blacklistedSite) => {
                    return dbHelper.getBlacklistedSiteByWebsiteId(
                      blacklistedSite.website_id,
                      userId
                    );
                  })
                  .then((website) => {
                    return res.status(201).json(website);
                  })
                  .catch((err) => res.status(500).json(err));
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
    // console.log("Req Params =======>", req.params);
    // console.log("Req Body ======>", req.body);
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    // console.log("website ID ====>Before", id);
    dbHelper
      .disableWebsiteInBlacklist(id, userId)
      .then((resp) => {
        // console.log("website ID ====>After", id);
        if (!id) {
          return res.status(400).json(err);
        }
        return res.status(200).json(resp);
      })
      .catch((err) => res.status(400).json(err));
  });

  // Shows list of friends
  router.get("/friends", (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    dbHelper
      // .getAcceptedFriends(userId)
      .getFriendsInfo(userId)
      // Need to decide which query we will use. getAcceptedFriends gives id, user_id, friend_id, pending... getFriendsInfo gives names, pictures, etc.
      .then((friendsList) => {
        // if (!friendsList) {
        //   return res.status(200).json({ friend_id: null });
        // }
        return res.status(200).json(friendsList);
      })
      .catch((err) => res.status(400).json(err));
  });

  // When a user sends a Friend Request (User 1 wants to add User 2)
  // This needs more logic: will probably be sent to back-end with a friend's email, convert email to a friend_id
  router.post("/friends/add", (req, res) => {
    const { userId } = req.session;
    const { friendId } = req.body;
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    // Send the friend request
    dbHelper
      .sendFriendRequest(userId, friendId)
      .then((request) => {
        return (
          res
            .status(200)
            // .json(`${userId} has sent a friend's request to ${friendId}`);
            .json(request)
        );
      })
      .catch((err) => res.status(400).json(err));
  });

  // When user 1 wants to see their notification for a friend add. (User 2 receives a friends request, user 2 can view it here)
  router.get("/friends/notification", (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    // View a friend request
    dbHelper
      .getFriendRequests(userId)
      .then((request) => {
        return (
          res
            .status(200)
            // .json(`${userId} has sent a friend's request to ${friendId}`);
            .json(request)
        );
      })
      .catch((err) => res.status(400).json(err));
  });

  // Users can view which friends are pending. (User 1 wants to see if User 2 has accepted or not)
  router.get("/friends/pending", (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    // View a friend request
    dbHelper
      .getPendingFriendsSent(userId)
      .then((request) => {
        return (
          res
            .status(200)
            // .json(`${userId} has sent a friend's request to ${friendId}`);
            .json(request)
        );
      })
      .catch((err) => res.status(400).json(err));
  });

  // When a user sees a friend request, they can accept it (User 2 recieved a friend request from User 1, they can accept it)
  // This needs more logic: will probably be sent to back-end with a friend's email, convert email to a friend_id
  router.post("/friends/accept", (req, res) => {
    const { userId } = req.session;
    const { friendId } = req.body;
    if (!userId) {
      return res.status(403).json("Please sign in first.");
    }
    dbHelper
      .acceptFriendRequest(userId, friendId)
      .then((request) => {
        return res.status(200).json(request);
      })
      .catch((err) => res.status(400).json(err));
  });

  // Just a test route to test db queries and response
  router.get("/test", (req, res) => {
    // const { host_name } = req.body;

    const host_name = "www.google.com";
    const URL = remPrefix(host_name);
    const userId = 1;
    dbHelper
      .getWebsiteIDByHostname(URL)
      .then((site) => {
        if (!site) {
          // console.log("=====> Website does not exist yet DB, adding to db");
          const name = extractNameFromURL(URL);
          const category = null;
          dbHelper.addWebsite(URL, name, category).then((site) => {
            // console.log("=====> Adding a new site to blacklist");
            console.log(site);
            return dbHelper.addWebsiteToBlacklist(userId, site.id);
          });
        } else {
          // console.log("=====> Website exists in database");
          // console.log("=====> Adding an old site to this user's blacklist");
          return dbHelper.addWebsiteToBlacklist(userId, site.id);
        }
      })
      .then(() => res.json(`${URL} added to blacklist`))
      .catch((err) => res.status(400).json(err));
  });

  return router;
};
