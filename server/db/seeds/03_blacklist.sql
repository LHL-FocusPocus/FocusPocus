INSERT INTO blacklists
  (user_id, website_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (2, 4),
  (2, 2),
  (3, 5),
  (4, 6),
  (6, 4),
  (8, 8),
  (7, 7),
  -- Adding Friends' Facebook to users blacklisted sites:
  (3, 2),
  (4, 2),
  (5, 2),
  (6, 2),
  (7, 2),
  (8, 2);
