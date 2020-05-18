DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE friends
(
  id        SERIAL  PRIMARY KEY,

  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  pending   BOOLEAN NOT NULL DEFAULT TRUE,

  UNIQUE  (user_id, friend_id)
)
;