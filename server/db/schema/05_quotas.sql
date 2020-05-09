DROP TABLE IF EXISTS quotas CASCADE;

CREATE TABLE quotas
(
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  interval INTEGER NOT NULL,

  date_valid_from TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  date_valid_until TIMESTAMP WITHOUT TIME ZONE + INTERVAL '1 day'
)
-- Not sure what values the dates should hold. Should it be the current date/time when the quota was created?
-- Should valid_until just be 24 hrs from when the quota was created? Should it be the timestamp + interval? <-- Was having trouble attempting this
-- If we have interval, then we technically don't need date_valid_until in the db.
