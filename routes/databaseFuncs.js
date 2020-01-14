const bcrypt = require("bcrypt");

const addUser = (db, user) => {
  let { email, name, phone } = user
  const pw = user.password;
  const password = bcrypt.hashSync(pw, 10);

  return db.query(`INSERT INTO users (email, password) VALUES
  ($1, $2) RETURNING *;`, [email, password])
  .then(res => {
    const myUser = res.rows[0];
    console.log(myUser);
    return Promise.resolve(res.rows[0]);
  })
 }
exports.addUser = addUser;

const addCustomer = (db, customer) => {
  const user_id = customer.user_id;
  const name = customer.name;
  const phone = customer.phone;
  return db.query(`INSERT INTO customers (user_id, name, phone) VALUES ($1, $2, $3) RETURNING *;`, [user_id, name, phone])
  .then(res => {
    console.log("new customer is: " + res.rows[0].id);
    return Promise.resolve(res.rows[0]);
  });
}
exports.addCustomer = addCustomer;

const getUserWithEmail = (db, email) => {
  return db.query(`
  SELECT * FROM users WHERE email = $1
  `,[email])
  .then(result => {
    user = result.rows[0];
    if (!user) {
      return null;
    } else {
      return user;
    }
  })
};

exports.getUserWithEmail = getUserWithEmail;

const getRestaurantWithName = (db, name) => {
  return db.query(`SELECT *
  FROM restaurants
  WHERE name = $1`, [name])
  .then(res => {
    // console.log(res.rows);
    return Promise.resolve(res.rows[0]);
  });
};

exports.getRestaurantWithName = getRestaurantWithName;

const getMenuForRestaurant = (db, restaurant_id) => {
  return db.query( `SELECT foods.*
  FROM foods
  JOIN restaurants on foods.restaurant_id = restaurants.id
  WHERE restaurants.id = $1;`, [restaurant_id])
  .then(res => {
    console.log("menu: " + res.rows);
    return Promise.resolve(res.rows);
  });
};

exports.getMenuForRestaurant = getMenuForRestaurant;

const login = (db, em, pw) => {
  return getUserWithEmail(db,em)
  .then(user => {
    if (!user) {
      return null;
    }
    if (bcrypt.compareSync(pw, user.password)) {
      return user;
    } else {
      return null;
    }
  })
}

exports.login = login;

const checkDuplicate = (db, user) => {
  let { email } = user
  return db.query(`SELECT * FROM users WHERE email = $1`,[email])
  .then(res => {
    if (res.rows[0])
      return Promise.reject('Already Exists!');
    });
};

exports.checkDuplicate = checkDuplicate;
