INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-09 01:23:45-04', '45 minutes'),
  (1, 3, '2020-05-12 15:23:45-04', '13 minutes'),
  (1, 3, '2020-05-13 15:23:45-04', '15 minutes'),
  (1, 3, '2020-05-14 15:23:45-04', '40 minutes'),

  (2, 2, '2020-05-09 12:23:45-04', '250 minutes'),
  (2, 0, '2020-05-09 01:23:45-04', '150 minutes'),

-- Adding random browse time for today where user_id = 1:,
  (1, 1, '2020-05-14 01:23:45-04', '29 minutes'),
  (1, 3, '2020-05-14 15:23:45-04', '13 minutes'),
  (1, 3, '2020-05-14 15:23:45-04', '15 minutes'),
  (1, 0, '2020-05-14 15:23:45-04', '40 minutes'),
  (1, 2, '2020-05-14 15:23:45-04', '40 minutes'),
  (1, 4, '2020-05-14 15:23:45-04', '40 minutes'),

-- Adding blacklisted Browse Time for the past month where user_id = 1,
  (1, 1, '2020-04-30 01:23:45-04', '100 minutes'),
  (1, 1, '2020-05-01 01:23:45-04', '60 minutes'),
  (1, 1, '2020-05-02 01:23:45-04', '34 minutes'),
  (1, 1, '2020-05-03 01:23:45-04', '100 minutes'),
  (1, 1, '2020-05-04 01:23:45-04', '120 minutes'),
  (1, 1, '2020-05-05 01:23:45-04', '91 minutes'),
  (1, 1, '2020-05-06 01:23:45-04', '41 minutes'),
  (1, 1, '2020-05-07 01:23:45-04', '100 minutes'),
  (1, 1, '2020-05-08 01:23:45-04', '49 minutes'),
  (1, 1, '2020-05-09 01:23:45-04', '20 minutes'),
  (1, 1, '2020-05-10 01:23:45-04', '240 minutes'),
  (1, 1, '2020-05-12 01:23:45-04', '102 minutes'),
  (1, 1, '2020-05-13 01:23:45-04', '204 minutes'),
  (1, 1, '2020-05-14 01:23:45-04', '200 minutes'),
  (1, 1, '2020-05-15 01:23:45-04', '75 minutes'),
  (1, 1, '2020-05-16 01:23:45-04', '70 minutes'),

-- Adding blacklisted Browse Time for the past week where user_id = 1,
  (1, 1, '2020-05-15 01:23:45-04', '100 minutes'),
  (1, 1, '2020-05-16 01:23:45-04', '14 minutes'),
  (1, 1, '2020-05-17 01:23:45-04', '44 minutes'),
  (1, 1, '2020-05-18 01:23:45-04', '150 minutes'),
  (1, 1, '2020-05-19 01:23:45-04', '79 minutes'),
  (1, 1, '2020-05-20 01:23:45-04', '120 minutes'),


-- Adding Good Browse Time for the past month where user_id = 1,
  (1, 0, '2020-04-30 01:23:45-04', '200 minutes'),
  (1, 0, '2020-05-01 01:23:45-04', '120 minutes'),
  (1, 0, '2020-05-02 01:23:45-04', '20 minutes'),
  (1, 0, '2020-05-03 01:23:45-04', '50 minutes'),
  (1, 0, '2020-05-04 01:23:45-04', '90 minutes'),
  (1, 0, '2020-05-05 01:23:45-04', '300 minutes'),
  (1, 0, '2020-05-06 01:23:45-04', '49 minutes'),
  (1, 0, '2020-05-07 01:23:45-04', '19 minutes'),
  (1, 0, '2020-05-08 01:23:45-04', '92 minutes'),
  (1, 0, '2020-05-09 01:23:45-04', '18 minutes'),
  (1, 0, '2020-05-10 01:23:45-04', '24 minutes'),
  (1, 0, '2020-05-12 01:23:45-04', '39 minutes'),
  (1, 0, '2020-05-13 01:23:45-04', '90 minutes'),
  (1, 0, '2020-05-14 01:23:45-04', '100 minutes'),
  (1, 0, '2020-05-15 01:23:45-04', '41 minutes'),
  (1, 0, '2020-05-16 01:23:45-04', '64 minutes'),


-- Adding bad browsing time for Friends within past week,
  (3, 2, '2020-05-15 01:23:45-04', '300 minutes'),
  (4, 2, '2020-05-15 01:23:45-04', '350 minutes'),
  (5, 2, '2020-05-15 01:23:45-04', '400 minutes'),
  (6, 2, '2020-05-15 01:23:45-04', '450 minutes'),
  (7, 2, '2020-05-15 01:23:45-04', '500 minutes'),
  (8, 2, '2020-05-15 01:23:45-04', '600 minutes'),

-- Adding good browsing time for Friends within past week,
  (3, 0, '2020-05-15 01:23:45-04', '64 minutes'),
  (4, 0, '2020-05-15 01:23:45-04', '100 minutes'),
  (5, 0, '2020-05-15 01:23:45-04', '164 minutes'),
  (6, 0, '2020-05-15 01:23:45-04', '40 minutes'),
  (7, 0, '2020-05-15 01:23:45-04', '200 minutes'),
  (8, 0, '2020-05-15 01:23:45-04', '300 minutes');
