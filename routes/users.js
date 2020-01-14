/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, dbFuncs) => {

  router.get("/login", (req, res) => {
   res.render("user_login");
  });

  router.get("/signup", (req, res) => {
    res.render("user_signup");
  });

  router.post("/", (req, res) => {
    const user = req.body;

    dbFuncs.addUser(db, user)
    .catch(err => {
      res.statusCode = 404;
      res.send('error!', err.message)
    })
    res.redirect("/users/login");
  });

  return router;
};
