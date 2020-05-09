DROP TABLE IF EXISTS browse_times CASCADE;

CREATE TABLE browse_times
(
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  website_hostname INTEGER REFERENCES websites(hostname) ON DELETE CASCADE,

  datetime_startdate TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  duration INTEGER NOT NULL DEFAULT 0
)

-- Assuming duration will just be an integer that the extension will write into the db, it will represent number of seconds
