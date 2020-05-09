DROP TABLE IF EXISTS websites CASCADE;

CREATE TABLE websites
(
  hostname TEXT PRIMARY KEY,

  name TEXT NOT NULL,
  category TEXT NOT NULL
)
