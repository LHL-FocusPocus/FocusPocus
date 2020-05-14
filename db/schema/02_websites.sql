DROP TABLE IF EXISTS websites CASCADE;

CREATE TABLE websites
(
  id        SERIAL        PRIMARY KEY,
  hostname  VARCHAR(255)  UNIQUE NOT NULL,

  name      VARCHAR(255)  NOT NULL,
  category  VARCHAR(255)
)
