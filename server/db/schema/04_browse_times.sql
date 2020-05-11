DROP TABLE IF EXISTS browse_times CASCADE;

CREATE TABLE browse_times
(
  id                  SERIAL        PRIMARY KEY,

  user_id             INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  website_id          INTEGER       REFERENCES websites(id) ON DELETE CASCADE,

  datetime_start      TIMESTAMP     WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  duration            INTERVAL      NOT NULL DEFAULT '1 minute'
)
