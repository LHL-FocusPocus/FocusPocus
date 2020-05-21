# About the Project
FocusPocus

A quirky productivity app + Chrome extension that replaces all images/videos on time-wasting sites (Reddit, Facebook) instead of blocking them outright. Includes data visualization and social aspects to keep you motivated on your quest to cut down on bad browsing behaviour.

Created by:
Matt Taylor - https://github.com/xynyx
Taha Rizvi - https://github.com/riztaha
Jimmy Peng - https://github.com/jpqy

https://github.com/LHL-FocusPocus/FocusPocus

Front-end: React, Material-UI Back-end: Express, Node.JS, Postgres, Socket.IO


## Screenshots
!["Index"](https://github.com/LHL-FocusPocus/FocusPocus/blob/master/client/public/imgs/FocusPocus-Landing.png)
!["Dashboard"](https://github.com/LHL-FocusPocus/FocusPocus/blob/master/client/public/imgs/FocusPocus.gif)
!["Add To Blacklist"](https://github.com/LHL-FocusPocus/FocusPocus/blob/master/client/public/imgs/FocusPocus-navbar-add-site.gif)
!["Customize your settings"](https://github.com/LHL-FocusPocus/FocusPocus/blob/master/client/public/imgs/FocusPocus-replacements.gif)
!["Extension"](https://github.com/LHL-FocusPocus/FocusPocus/blob/master/client/public/imgs/FocusPocus-extension.gif)

=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `final`
3. Install dependencies: `npm i` (in 'server', 'client', 'chrome-extension-react' directories)
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Go to 'server' directory in terminal and type 'npm run local'
7. Go to 'client' directory in terminal and type 'npm start'
8. Go to 'chrome-extension-react' in terminal and run 'npm run build'
9. Go to Google Chrome url: chrome://extensions/
10. Click 'Load unpacked'. Navigate to 'chrome-extension-react/build' and select.
11. Visit `http://localhost:3000/` for and register.


## Warnings & Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
