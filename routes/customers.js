/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, dbFuncs) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
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
      res.redirect(`/restaurants/${restaurant_name}`);
    })
    .catch(err=> {res.send(err.message)});
  });
  return router;
};
