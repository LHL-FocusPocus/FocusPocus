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

  return {
    getUserWithEmail
  };
};
