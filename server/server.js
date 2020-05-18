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
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const dataRoutes = require("./routes/dataRoutes");
const extensionRoutes = require("./routes/extensionRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", rootRoutes(db));
app.use("/api", apiRoutes(db));
app.use("/api/user", userRoutes(db));
app.use("/api/data", dataRoutes(db));
app.use("/api/extension", extensionRoutes(db));

// to do routes:
// login
//
// Note: mount other resources here, using the same pattern above

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// Websocket setup
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
