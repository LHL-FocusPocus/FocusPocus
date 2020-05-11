DROP TABLE IF EXISTS blacklists CASCADE;

CREATE TABLE blacklists
(
  id          SERIAL  PRIMARY KEY,

  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  website_id  INTEGER REFERENCES websites(id) ON DELETE CASCADE
)