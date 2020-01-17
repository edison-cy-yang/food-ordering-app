/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./databaseFuncs');
const dbFuncs = require('./databaseFuncs');
const util = require('util');

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get("/:name", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/users/login");
      return;
    }
    const restaurant_name = req.params.name;
    const name = "Five Guys";
    //TODO: Look up restaurant information from database,
    //      find its menu, save restaurant info & menu into templateVars, and use tempalteVars in render
    //database.getRestaurantWithName();
    //database.getMenuForRestaurant();
    const templateVars = {};
    database.getRestaurantWithName(db, restaurant_name)
    .then(restaurant => {
      console.log(`restaurant id ${restaurant.id}`);
      return database.getMenuForRestaurant(db, restaurant.id);
    })
    .then(foodItems => {
      templateVars["menu"] = foodItems;
      const user_id = req.session.userId;
      return database.getCustomerWithId(db, user_id);
    })
    .then(result => {
      console.log("result here:", result.phone);
      const user = result;
      console.log("usr",result);
      templateVars["user"] = result;
      console.log("resulting tempVars", templateVars);
      res.render("restaurant_menu", templateVars);
    })
    .catch(err => {
      res.status(500).send({error: err.message});
    });
  });

  router.get("/:name/portal", (req, res) => {
    /*TODO: get restaurant id with name
    //find all the orders associated with the restaurant,
    //with each order
    1. Find the name of the customer that made the order
    2. find all the line items inside the order, save theses two info to templateVars
    // templateVars = {orders: [
      {order_id: id, customer_name: customer_name, line_items: [{food_id: 1, food_name: 'burger', quantity: 3}, {}, ...]}
    ]}
    */

    database.getOrdersForRestaurantWithName(db, "Five Guys")
    .then(orders => {
      console.log(`result back from getOrdersForRestaurantWithName: ${orders.length}`);
      for (const order of orders) {
        // console.log(util.inspect(order, {depth:null}));
      }
      //order the result to be an array or orders, each order contains an array of food items
      let map = {};
      for (let order of orders) {
        if (!map[order.order_id]) {
          const item = {
            food_name: order.food_name,
            quantity: order.quantity
          };
          map[order.order_id] = {
            order_id: order.order_id,
            customer_name: order.customer_name,
            phone: order.phone,
            created_at: order.created_at,
            accepted_at: order.accepted_at,
            completed_at: order.completed_at,
            pickedup_at: order.pickedup_at,
            estimated_time: order.estimated_time,
            food_items: [item]
          };
        } else {
          const item = {
            food_name: order.food_name,
            quantity: order.quantity
          };
          map[order.order_id].food_items.push(item);
        }
      }
      console.log(util.inspect(Object.values(map), {depth:null}));
      const groupedOrders = Object.values(map);
      const templateVars = {orders: groupedOrders};
      templateVars["user"] = {name: "Five Guys"}
      res.render("restaurant_portal", templateVars);
    })
    .catch(err => {
      console.log(err);
    })

    //database.getCustomerNameWithId();


  });

  router.post("/login", (req, res) => {
    const {email, password} = req.body;
    // if (!email || !password) {
    //   res.send('Not authorized');
    //   return
    // }
    dbFuncs.login(db, email, password)
    .then(user => {
      if(!user) {
        res.statusCode = 401;
        res.send({error: 'Not authorized'});
        return;
      }
      req.session.userId = user.id;
      const restaurant_name = "Five Guys";
      res.redirect(`/restaurants/${restaurant_name}/portal`);
    })
    .catch(err=> {res.send(err.message)});
  });

  return router;
};
