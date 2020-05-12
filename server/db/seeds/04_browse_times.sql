INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-09 01:23:45-04', '45 minutes');

INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-09 01:23:45-04', '29 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-09 15:23:45-04', '13 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-08 15:23:45-04', '15 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-10 15:23:45-04', '40 minutes');

INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-11 01:23:45-04', '200 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 2, '2020-05-11 01:23:45-04', '100 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-11 01:23:45-04', '43 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 2, '2020-05-11 01:23:45-04', '29 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-11 01:23:45-04', '400 minutes');

INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-12 15:23:45-04', '13 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-13 15:23:45-04', '15 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 3, '2020-05-14 15:23:45-04', '40 minutes');

INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (2, 4, '2020-05-09 14:23:45-04', '10 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (2, 2, '2020-05-09 12:23:45-04', '10 minutes');
  INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (2, 0, '2020-05-09 01:23:45-04', '150 minutes');


-- Adding blacklisted Browse Time for the past month where user_id = 1:
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-04-26 01:23:45-04', '200 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-04-27 01:23:45-04', '120 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-04-28 01:23:45-04', '20 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-04-29 01:23:45-04', '50 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-04-30 01:23:45-04', '90 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-01 01:23:45-04', '300 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-02 01:23:45-04', '49 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-03 01:23:45-04', '19 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-04 01:23:45-04', '92 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-05 01:23:45-04', '18 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-06 01:23:45-04', '24 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-07 01:23:45-04', '39 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-08 01:23:45-04', '90 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-09 01:23:45-04', '100 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-10 01:23:45-04', '41 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 1, '2020-05-11 01:23:45-04', '64 minutes');


-- Adding Good Browse Time for the past month where user_id = 1:
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-04-26 01:23:45-04', '200 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-04-27 01:23:45-04', '120 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-04-28 01:23:45-04', '20 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-04-29 01:23:45-04', '50 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-04-30 01:23:45-04', '90 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-01 01:23:45-04', '300 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-02 01:23:45-04', '49 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-03 01:23:45-04', '19 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-04 01:23:45-04', '92 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-05 01:23:45-04', '18 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-06 01:23:45-04', '24 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-07 01:23:45-04', '39 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-08 01:23:45-04', '90 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-09 01:23:45-04', '100 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-10 01:23:45-04', '41 minutes');
INSERT INTO browse_times
  (user_id, website_id, datetime_start, duration)
VALUES
  (1, 0, '2020-05-11 01:23:45-04', '64 minutes');
