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

  const getBlacklistedWithUserID = function (id) {
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
        return res.rows[0];
      });
  };

  const getAllWebsites = function () {
    return db
      .query(
        `
        SELECT * FROM websites;
        `,
        [id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
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

  const getQuotaWithUserID = function (user_id) {
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
        return res.rows[0];
      });
  };

  const getBrowseTimesWithUserID = function (user_id) {
    return db
      .query(
        `
        SELECT browse_times.id as browse_times_id, user_id, users.first_name as user_first_name,
        users.last_name as user_last_name, website_id, websites.hostname as hostname, datetime_start, duration
        FROM browse_times
        JOIN websites ON websites.id = website_id
        JOIN users ON users.id = user_id
        WHERE user_id = $1
        `,
        [user_id]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
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

  // Basic setup To-Do:
  // Query to set quota - done
  // Query to add website - done
  // Query to add website to blacklist - done
  // Query to get blacklisted websites for a user - done
  // Query to get all websites - done
  // Query to add user - done
  // Query to get user - done
  // Query to get user's quota - done
  // Query to get a users browse times (along with additional info)

  return {
    getUserWithEmail,
    getBlacklistedWithUserID,
    getAllWebsites,
    getQuotaWithUserID,
    getBrowseTimesWithUserID,
    addUser,
    addQuotaForUser,
    addWebsite,
    addWebsiteToBlacklist,
    addBrowseTimesToUserID,
  };
};
