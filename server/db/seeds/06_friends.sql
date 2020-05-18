INSERT INTO friends
  (user_id, friend_id, pending)
VALUES
  (1, 8, false),
  (8, 1, false),
  (1, 9, false),
  (9, 1, false),
  (1, 3, true) -- user_id 1 is waiting for friend_id 3 to accept the request.
  ;
