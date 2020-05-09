DROP TABLE IF EXISTS blacklist CASCADE;

CREATE TABLE blacklist
(
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  website_hostname TEXT REFERENCES websites(hostname) ON DELETE CASCADE
)
