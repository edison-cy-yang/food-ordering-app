/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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

    //TODO: Look up restaurant information from database,
    //      find its menu, save restaurant info & menu into templateVars, and use tempalteVars in render
    res.render("restaurant_menu");
  });

  router.get("/:name/portal", (req, res) => {
    res.render("restaurant_portal");
  });

  return router;
};
