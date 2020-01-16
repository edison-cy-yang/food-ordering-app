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
const cookieSession = require("cookie-session");
const database = require("./routes/databaseFuncs");
const twilio = require('./twilio');

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
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const customersRoutes = require("./routes/customers");
const restaurantsRoutes = require("./routes/restaurants");
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/customers", customersRoutes(db, database));
app.use("/restaurants", restaurantsRoutes(db, database));
app.use("/users", usersRoutes(db, database));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

let order;
app.get("/order_review", (req, res) => {
  const user_id = req.session.userId;
  order['customer_id']=user_id;
  const restaruant_id = order.restaurant_id;
  return db.query(`SELECT * FROM restaurants WHERE id = $1;`,[restaruant_id])
    .then(data => {
      const restaurant = data.rows[0];
      order['restaurant_info'] = restaurant;
      console.log(order);
      return Promise.resolve(order);
      })
      .then(order => {
        res.render("order_review", { order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

app.post("/order_review", (req, res) => {
  order = req.body;
});

app.post("/orders/new", (req, res) => {
  //TODO: get order details from req.body, add order to database, then use Twilio code to send text
    console.log("order placed!    ",req.body);
  });

app.get("/order_confirmation", (req, res) => {
  res.render("order_confirmation");
});

app.post("/orders", (req, res) => {
//TODO: get order details from req.body, add order to database, then use Twilio code to send text
  // const order = req.body.order;
  // const foodItems = req.body.foodItems

  // const order = {restaurant_id: 1, customer_id: 1, created_at: "2020-02-12T08:08:40.000Z", total_price: 1000, points_earned: 10};
  // const foodItems = [{food_id: 1, quantity: 1}, {food_id: 2, quantity: 2}];

  const order = {restaurant_id: req.body.restaurant_id, customer_id: req.body.customer_id, total_price: req.body.total};
  const foodItems = req.body.food_items;

  //call database to insert one order
  database.createOrder(db, order)
  .then(order => {
    console.log(`order id: ${order.id}`);
    return database.createLineItemsForOrder(db, order.id, foodItems)
  })
  .then(lineItems => {
    for (let item of lineItems) {
      console.log(`items: ${item.id}`);
    }

    twilio.sendRestaurantMessage();
    res.redirect("/restaurants/Five Guys");
  })
  .catch(err => {
    console.log(err);
  });
});

app.post("/orders/:id/accept", (req, res) => {
  const id = req.params.id;
  //call database.acceptOrder(db, order_id)
  const waitTime = Number(req.body.waitTime);
  const phone = req.body.phone;
  const name = req.body.name;
  console.log(phone);
  console.log(name);
  database.acceptOrderWithId(db, id, waitTime)
  .then(result => {
    console.log("result back from databaseFuncs" + result);
    //get customer phone

    ////SEND TEXT to cusomter
    twilio.sendCustomerMessage(name, phone, waitTime);
    res.status(201).send();
  });
});

app.post("/orders/:id/complete", (req, res) => {
  const id = req.params.id;
  //call database.completeOrder(db, order_id)
  database.completeOrderWithId(db, id)
  .then(result => {
    console.log("result back from databaseFuncs" + result);
    res.status(201).send();
  });
});

app.post("/api/sms", (req, res) => {
  //code for twilio
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
