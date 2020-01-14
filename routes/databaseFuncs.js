const bcrypt = require("bcrypt");

const addUser = (mydb, user) => {
  let { email, name, is_customer, phone } = user
  const pw = user.password;
  const password = bcrypt.hashSync(pw, 10);
  // name = 'asd';
  // is_customer = true;
  // phone = '123123123';

  return mydb.query(`INSERT INTO users (email, password, is_customer) VALUES
  ($1, $2, $3) RETURNING *;`, [email, password, is_customer])
  .then(res => {
    const myUser = res.rows[0];
    const user_id = myUser.id;
    console.log("user data received",user);
    if (user.is_customer) {
      db.query(`INSERT INTO customers (user_id, name, phone) VALUES ($1, $2, $3)`, [user_id, name, phone]);
      console.log("user data inserted",user_id, name, phone);
    }
    // else {
    //   db.query(`INSERT INTO restaurants ( ) VALUES ()`, []);
    // };
  })
 }
exports.addUser = addUser;

const getUserWithEmail = (Db, email) => {
  return Db.query(`
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

const login = (myDb, em, pw) => {
  return getUserWithEmail(myDb,em)
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
