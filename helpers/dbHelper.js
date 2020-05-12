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
      });
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
      });
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
      });
  };

  const getBlacklistedSitesWithUserID = function (id) {
    return db
      .query(
        `
        SELECT blacklists.id as blacklists_id, user_id, website_id, hostname, name, category
        FROM blacklists
        JOIN websites ON website_id = websites.id
        WHERE user_id = $1;
        `,
        [id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const getAllWebsites = function () {
    return db
      .query(
        `
        SELECT * FROM websites;
        `
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
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
      });
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
      });
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

    return db.query(queryString, queryParams).then((res) => {
      if (res.rows.length === 0) return null;
      return res.rows[0];
    });
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
        if (res.rows.length === 0) return null;
        return res.rows;
      });
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
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const addBrowseTimesToUserID = function (user_id, website_id, duration) {
    return db
      .query(
        `
        INSERT INTO browse_times (user_id, website_id, duration)
        VALUES ($1, $2, $4)
        RETURNING *;
        `,
        [user_id, website_id, duration]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
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
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
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
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
  };

  const getQuotaForTodayWithUserID = function (user_id) {
    return db
      .query(
        `
        SELECT * FROM quotas
        WHERE user_id = $1
        AND CURRENT_DATE >= date_valid_from
        AND CURRENT_DATE < date_valid_until;
    `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
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
      });
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
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const getMonthBlacklistBrowsingInfoForChart = function (user_id) {
    return db
      .query(
        `
        SELECT datetime_start::DATE as date, SUM(duration) as time
        FROM browse_times
        JOIN blacklists ON browse_times.website_id = blacklists.website_id
        WHERE blacklists.user_id = $1
        AND datetime_start >= CURRENT_DATE - INTERVAL '30 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY date;
        `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const getTimeForLeaderboardWeek = function () {
    return db
      .query(
        `
        SELECT first_name as name, SUM(duration) as time
        FROM browse_times
        JOIN users on browse_times.user_id = users.id
        JOIN blacklists ON users.id = blacklists.user_id
        WHERE datetime_start >= CURRENT_DATE - INTERVAL '7 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY name
        ORDER BY time
        ASC LIMIT 6;
        `
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const getTimeForShameboardWeek = function () {
    return db
      .query(
        `
        SELECT first_name as name, SUM(duration) as time
        FROM browse_times
        JOIN users on browse_times.user_id = users.id
        JOIN blacklists ON users.id = blacklists.user_id
        WHERE datetime_start >= CURRENT_DATE - INTERVAL '7 days'
        AND datetime_start < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY name
        ORDER BY time
        DESC LIMIT 6;
        `
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
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
        if (res.rows.length === 0) return null;
        return res.rows;
      });
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
  };
};