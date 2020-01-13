// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const customersRoutes = require("./routes/customers");
const restaurantsRoutes = require("./routes/restaurants");
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/customers", customersRoutes(db));
app.use("/restaurants", restaurantsRoutes(db));
app.use("/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/order_review", (req, res) => {
  res.render("order_review");
});

app.get("/order_confirmation", (req, res) => {
  res.render("order_confirmation");
});

app.post("/orders", (req, res) => {
//TODO: get order details from req.body, add order to database, then use Twilio code to send text

});

app.post("/orders/:id", (req, res) => {
  const id = req.params.id;
  //TODO: use id to find order from database, update the accepted time, send text
})

app.post("/api/sms", (req, res) => {
  //code for twilio
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
