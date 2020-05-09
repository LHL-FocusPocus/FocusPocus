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
        WHERE email=$1
        LIMIT 1;
        `,
        [email]
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
        SELECT * FROM websites
        WHERE user_id=$1;
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
        VALUES ($1, $2, $3);
        `,
        [hostname, name, category]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
  };

  const addWebsiteToBlacklist = function (user_id, website_hostname) {
    return db
      .query(
        `
        INSERT INTO blacklist (user_id, website_hostname)
        VALUES ($1, $2);
        `,
        [user_id, website_hostname]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      });
  };

  const addQuotaForUser = function (user_id, interval) {
    return db
      .query(
        `
        INSERT INTO quotas (user_id, interval)
        VALUES ($1, $2);
        `,
        [user_id, interval]
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

  return {
    getUserWithEmail,
    getBlacklistedWithUserID,
    getAllWebsites,
    addWebsite,
    addWebsiteToBlacklist,
    addQuotaForUser,
  };
};
