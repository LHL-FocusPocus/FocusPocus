// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 9000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cors({ credentials: true, preflightContinue: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CLIENT || "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
const session = cookieSession({
  name: "session",
  keys: ["key1"],
  sameSite: "none",
  secureProxy: true,
});
app.use(session);
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Separated Routes for each Resource
const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const extensionRoutes = require("./routes/extensionRoutes");

// Mount all resource routes
app.use("/api/user", userRoutes(db));
app.use("/api/data", dataRoutes(db));
app.use("/api/extension", extensionRoutes(db, sendRefreshRequest));

// Websocket setup
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cookie: false });

io.on("connection", (socket) => {
  // Extract client's userId from cookie
  let userId;
  let cookieString = socket.request.headers.cookie;
  let req = {
    connection: { encrypted: false },
    headers: { cookie: cookieString },
  };
  let res = { getHeader: () => {}, setHeader: () => {} };
  session(req, res, () => {
    userId = req.session.userId;
  });
  // Put client into a room with their userId as the room name
  if (userId) {
    socket.join(userId);
  }
});

/**
 * Sends a refresh request through socketio to the room named after the userId.
 * To be called at the end of every POST request adding browse time, to tell
 * the client to make a call to /api/user/dashboard to retrieve updated data.
 * @param {Integer} userId
 */
function sendRefreshRequest(userId) {
  io.to(userId).emit("refresh");
}

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
