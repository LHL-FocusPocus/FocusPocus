module.exports = (db) => {
  /**
   * Get a single user from the db given their email.
   * @param {String} email The email of the user.
   * @return {Promise<{}>} A promise to get the user object from db.
   */

  const getUserWithEmail = function (email) {
    return db
      .query(
        `
        SELECT * FROM users
        WHERE email = $1
        LIMIT 1;
        `,
        [email]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getUserWithID = function (id) {
    return db
      .query(
        `
        SELECT * FROM users
        WHERE id = $1
        LIMIT 1;
        `,
        [id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const addUser = function (first_name, last_name, email, password) {
    return db
      .query(
        `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [first_name, last_name, email, password]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getBlacklistedSitesWithUserID = function (id) {
    return db
      .query(
        `
        SELECT blacklists.id as blacklists_id, user_id, website_id, hostname, name, category
        FROM blacklists
        JOIN websites ON website_id = websites.id
        WHERE user_id = $1 AND enabled = TRUE;
        `,
        [id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getAllWebsites = function () {
    return db
      .query(
        `
        SELECT * FROM websites;
        `
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const addWebsite = function (hostname, name, category) {
    return db
      .query(
        `
        INSERT INTO websites (hostname, name, category)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [hostname, name, category]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const addWebsiteToBlacklist = function (user_id, website_id) {
    return db
      .query(
        `
        INSERT INTO blacklists (user_id, website_id)
        VALUES ($1, $2)
        RETURNING *;

        `,
        [user_id, website_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const disableWebsiteInBlacklist = (websiteId, userId) => {
    return db
      .query(
        `
        UPDATE blacklists SET enabled = NOT enabled
        WHERE (website_id = $1 AND user_id = $2 AND enabled = TRUE)
        RETURNING *;
    `,
        [websiteId, userId]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => console.error(err));
  };

  const addQuotaForUser = function (
    user_id,
    time_allotment,
    date_valid_from,
    date_valid_until
  ) {
    const queryParams = [user_id, time_allotment];
    const queryString = `INSERT INTO quotas `;

    if (!date_valid_from && !date_valid_until) {
      queryString += `(user_id, time_allotment) VALUES ($1, $2) RETURNING *;`;
    } else if (!date_valid_until) {
      queryString += `(user_id, time_allotment, date_valid_from) VALUES ($1, $2, $3) RETURNING *;`;
      queryParams.push(date_valid_from);
    } else {
      queryString += `(user_id, time_allotment, date_valid_from, date_valid_until) VALUES ($1, $2, $3, $4) RETURNING *;`;
      queryParams.push(date_valid_from, date_valid_until);
    }

    return db
      .query(queryString, queryParams)
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getAllQuotasWithUserID = function (user_id) {
    return db
      .query(
        `
        SELECT * FROM quotas
        WHERE user_id = $1;
        `,
        [user_id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getBrowseInfoWithUserID = function (user_id) {
    return db
      .query(
        `
        SELECT users.first_name as user_first_name,
        users.last_name as user_last_name, websites.hostname as hostname,
        datetime_start, duration
        FROM browse_times
        JOIN websites ON websites.id = website_id
        JOIN users ON users.id = user_id
        WHERE user_id = $1;
        `,
        [user_id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const addBrowseTimesToUserID = function (user_id, website_id, duration) {
    return db
      .query(
        `
        INSERT INTO browse_times (user_id, website_id, duration)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [user_id, website_id, duration]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getTotalTimeForTodayByUserID = function (user_id) {
    return db
      .query(
        `
      SELECT SUM(duration)
      FROM browse_times
      WHERE user_id = $1
      AND datetime_start >= CURRENT_DATE
      AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
      GROUP BY user_id;
      `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return { sum: 0 };
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getTotalBlacklistTimeForTodayByUserID = function (user_id) {
    return db
      .query(
        `
        SELECT SUM(duration)
        FROM browse_times
        JOIN blacklists ON browse_times.website_id = blacklists.website_id
        WHERE blacklists.user_id = $1
       AND datetime_start >= CURRENT_DATE
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY browse_times.user_id;
      `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return { sum: 0 };
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getQuotaForTodayWithUserID = function (user_id) {
    return db
      .query(
        `
        SELECT * FROM quotas
        WHERE user_id = $1
        AND CURRENT_DATE >= date_valid_from
        AND CURRENT_DATE < date_valid_until
        ORDER BY id DESC;
    `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getWebsiteIDByHostname = function (hostname) {
    return db
      .query(
        `
        SELECT id FROM websites
        WHERE hostname = $1;
        `,
        [hostname]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => err);
  };

  const getBrowseInfoTodayForDashboard = function (user_id) {
    return db
      .query(
        `
        SELECT name as website,
        SUM(duration) as time
        FROM browse_times
        JOIN websites ON websites.id = website_id
        JOIN users ON users.id = user_id
        WHERE user_id = $1
        AND datetime_start >= CURRENT_DATE AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY name;
        `,
        [user_id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getMonthBlacklistBrowsingInfoForChart = function (user_id) {
    return db
      .query(
        `
        SELECT datetime_start::DATE as date, SUM(duration) as time
        FROM browse_times
        JOIN blacklists ON browse_times.website_id = blacklists.website_id
        WHERE blacklists.user_id = $1 AND browse_times.user_id = $1
        AND datetime_start >= CURRENT_DATE - INTERVAL '30 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY date;
        `,
        [user_id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getTimeForLeaderboardWeek = function () {
    return db
      .query(
        `
        SELECT first_name as name, users.id, SUM(duration) as time
        FROM browse_times
        JOIN users on browse_times.user_id = users.id
        JOIN blacklists ON users.id = blacklists.user_id AND blacklists.website_id = browse_times.website_id
        WHERE datetime_start >= CURRENT_DATE - INTERVAL '7 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY users.id
        ORDER BY time
        ASC LIMIT 6;
        `
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getTimeForShameboardWeek = function () {
    return db
      .query(
        `
        SELECT first_name as name, users.id, SUM(duration) as time
        FROM browse_times
        JOIN users on browse_times.user_id = users.id
        JOIN blacklists ON users.id = blacklists.user_id AND blacklists.website_id = browse_times.website_id
        WHERE datetime_start >= CURRENT_DATE - INTERVAL '7 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY users.id
        ORDER BY time
        DESC LIMIT 6;
        `
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const getHitsForBlacklistedSiteForPastWeek = (user_id) => {
    return db
      .query(
        `
      SELECT websites.name AS name, COUNT(browse_times.website_id)::integer AS hits
      FROM websites JOIN blacklists ON websites.id = website_id
      JOIN browse_times ON browse_times.website_id = websites.id
      WHERE blacklists.user_id = $1
      AND datetime_start >= CURRENT_DATE - INTERVAL '7 days'
      AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
      GROUP BY name;
      `,
        [user_id]
      )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => err);
  };

  const enableBlacklistedSite = (website_id, user_id) => {
    return db
      .query(
        `
      UPDATE blacklists SET enabled = TRUE WHERE website_id = $1 AND user_id = $2;
    `,
        [website_id, user_id]
      )
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => console.error(err));
  };

  const getBlacklistedSiteByWebsiteId = (website_id, user_id) => {
    return db
      .query(
        `
      SELECT * FROM websites JOIN blacklists ON websites.id = website_id WHERE websites.id = $1 AND user_id = $2;
    `,
        [website_id, user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => console.error(err));
  };

  const isBlacklistedSiteEnabled = (website_id, user_id) => {
    return db
      .query(
        `
      SELECT * FROM blacklists JOIN WHERE website_id = $1 AND user_id = $2
      RETURNING *;
    `,
        [website_id, user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => console.error(err));
  };

  const adjustUserQuota = (newQuota, userId) => {
    return db
      .query(
        `
      UPDATE quotas SET time_allotment = $1 WHERE user_id = $2;
    `,
        [newQuota, userId]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((err) => console.error(err));
  };

  const getTopBlacklistedSites = () => {
    return db
      .query(
        `
      SELECT hostname, name, COUNT(website_id) AS number_blocked FROM blacklists JOIN websites ON website_id = websites.id GROUP BY name, hostname ORDER BY number_blocked DESC LIMIT 8;
    `
      )
      .then((res) => {
        return res.rows;
      })
      .catch((e) => console.error(e));
  };

  return {
    getUserWithEmail,
    getUserWithID,
    getBlacklistedSitesWithUserID,
    getAllWebsites,
    getAllQuotasWithUserID,
    getBrowseInfoWithUserID,
    addUser,
    addQuotaForUser,
    addWebsite,
    addWebsiteToBlacklist,
    disableWebsiteInBlacklist,
    addBrowseTimesToUserID,
    getTotalTimeForTodayByUserID,
    getTotalBlacklistTimeForTodayByUserID,
    getQuotaForTodayWithUserID,
    getWebsiteIDByHostname,
    getBrowseInfoTodayForDashboard,
    getMonthBlacklistBrowsingInfoForChart,
    getTimeForLeaderboardWeek,
    getTimeForShameboardWeek,
    getHitsForBlacklistedSiteForPastWeek,
    enableBlacklistedSite,
    getBlacklistedSiteByWebsiteId,
    isBlacklistedSiteEnabled,
    adjustUserQuota,
    getTopBlacklistedSites,
  };
};
