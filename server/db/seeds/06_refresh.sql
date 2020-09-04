INSERT INTO browse_times
  (user_id, website_id, duration)
VALUES
  -- Adding bad browsing time for Friends within past week,
  (2, 2, '250 minutes'),
  (3, 2, '300 minutes'),
  (4, 2, '350 minutes'),
  (5, 2, '400 minutes'),
  (6, 2, '450 minutes'),
  (7, 2, '500 minutes'),
  (8, 2, '600 minutes'),
  (9, 2, '650 minutes'),
  (10, 2, '700 minutes'),
  (1, 2, '1000 minutes'),
  -- Adding good browsing time for Friends within past week,
  (2, 0, '150 minutes'),
  (3, 0, '64 minutes'),
  (4, 0, '100 minutes'),
  (5, 0, '164 minutes'),
  (6, 0, '40 minutes'),
  (7, 0, '200 minutes'),
  (8, 0, '300 minutes');
