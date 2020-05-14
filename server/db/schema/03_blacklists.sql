DROP TABLE IF EXISTS blacklists CASCADE;

CREATE TABLE blacklists
(
  id          SERIAL  PRIMARY KEY,

  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  website_id  INTEGER NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT TRUE NOT NULL
  UNIQUE      (user_id, website_id) --This only allows 1 user_id-website_id relation to exist in the table
)
