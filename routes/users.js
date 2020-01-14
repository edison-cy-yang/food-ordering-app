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
    .then(newUser => {
      console.log("result back from addUser!!");
      console.log("new user from route: " + newUser.id);
      const customer = {user_id: newUser.id, name: user.name, phone: user.phone};
      //use the user id of the new user to add new customer
      return dbFuncs.addCustomer(db, customer);
    })
    .then(newCustomer => {
      console.log("result back from addCustomer!!");
      console.log("new customer from route: " + newCustomer.id);
    })
    .catch(err => {
      res.send(err);
    })
    res.redirect("/users/login");
  });

  return router;
};
