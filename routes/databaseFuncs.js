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

const createOrder = (db, order) => {
  const queryParams = [order.restaurant_id, order.customer_id, order.created_at, order.total_price, order.points_earned];
  return db.query(`INSERT INTO orders (restaurant_id, customer_id, created_at, total_price, points_earned)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`, queryParams)
  .then(res => {
    console.log(`results from create Order: ${res.rows}`)
    return Promise.resolve(res.rows[0]);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.createOrder = createOrder;

const createLineItemsForOrder = (db, order_id, foodItems) => {
  //ASSUMING THERE IS food item in an order
  let queryString = `INSERT INTO line_items (
    order_id,
    food_id,
    quantity
  ) VALUES `;
  for (let item of foodItems) {
    console.log(`name: ${item.food_id}, quantity ${item.quantity}`);
    const insertString = `(${order_id}, ${item.food_id}, ${item.quantity}),`;
    queryString += insertString;
  }
  queryString = queryString.slice(0, -1) + ' RETURNING *;';
  console.log(queryString);
  return db.query(queryString)
  .then(res => {
    console.log(`result from inserting line item: ${res.rows}`);
    return Promise.resolve(res.rows);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.createLineItemsForOrder = createLineItemsForOrder;

const getCustomerNameWithId = (db, customer_id) => {

}

exports.getCustomerNameWithId = getCustomerNameWithId;

const getOrdersForRestaurantWithName = (db, restaurant_name) => {
  return db.query(`SELECT orders.*, customers.name as customer_name, customers.phone as phone, line_items.*, foods.name as food_name
  FROM orders
  JOIN restaurants ON orders.restaurant_id = restaurants.id
  JOIN customers ON customers.id = orders.customer_id
  JOIN line_items ON line_items.order_id = orders.id
  JOIN foods ON line_items.food_id = foods.id
  WHERE restaurants.name = $1;
  `, [restaurant_name])
  .then(res => {
    console.log("result from selecting order for restaurant" + res.rows);
    return Promise.resolve(res.rows);
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getOrdersForRestaurantWithName = getOrdersForRestaurantWithName;

const acceptOrderWithId = (db, order_id, waitTime) => {
  console.log(`order being updated: ${order_id}`);
  return db.query(`UPDATE orders
  SET accepted_at = CURRENT_TIMESTAMP, estimated_time = $2
  WHERE id = $1`, [order_id, waitTime])
  .then(res => {
    console.log(`result from update: ${res.rows}`);
    return Promise.resolve(res.rows);
  })
  .catch(err => {
    console.log(err);
  })
};

exports.acceptOrderWithId = acceptOrderWithId;

const completeOrderWithId = (db, order_id) => {
  console.log(`order being completed: ${order_id}`);
  return db.query(`UPDATE orders
  SET completed_at = CURRENT_TIMESTAMP
  WHERE id = $1`, [order_id])
  .then(res => {
    console.log(`result from update: ${res.rows}`);
    return Promise.resolve(res.rows);
  })
  .catch(err => {
    console.log(err);
  })
};

exports.completeOrderWithId = completeOrderWithId;
