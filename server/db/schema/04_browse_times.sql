DROP TABLE IF EXISTS browse_times CASCADE;

CREATE TABLE browse_times
(
  id                  SERIAL        PRIMARY KEY,

  user_id             INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  website_id          INTEGER       REFERENCES websites(id) ON DELETE CASCADE,

  datetime_start      TIMESTAMP     WITH TIME ZONE,
  duration            INTERVAL      NOT NULL DEFAULT '1 minute'
);

-- Calculate datetime_start from current_timestamp and duration
create or replace function insert_browse_time() returns trigger as $$
begin
	if NEW.datetime_start is null then
		NEW.datetime_start := CURRENT_TIMESTAMP - NEW.duration;
	end if;
	return new;
end;
$$ language plpgsql;

create trigger trig_insert_browse_times
before insert
on browse_times
for each row
execute procedure insert_browse_time();