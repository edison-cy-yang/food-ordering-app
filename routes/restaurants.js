/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./databaseFuncs');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
      res.render("restaurant_menu", templateVars);
    })
    .catch(err => {
      res.status(500).send({error: "menu not available"});
    });
  });

  router.get("/:name/portal", (req, res) => {
    res.render("restaurant_portal");
  });

  return router;
};
