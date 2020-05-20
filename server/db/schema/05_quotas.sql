DROP TABLE IF EXISTS quotas CASCADE;

CREATE TABLE quotas
(
  id                SERIAL    PRIMARY KEY,

  user_id           INTEGER   REFERENCES users(id) ON DELETE CASCADE,
  time_allotment    INTERVAL  NOT NULL default '1.5 hours',

  date_valid_from   DATE      DEFAULT CURRENT_DATE,
  date_valid_until  DATE      DEFAULT 'INFINITY'
)
