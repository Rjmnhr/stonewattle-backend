const connection = require("../mySQL-DB");
const CryptoJS = require("crypto-js");

const Users = {
  createUser: (createUser, callback) => {
    const password = CryptoJS.AES.encrypt(
      createUser.password,
      "secondstorey"
    ).toString();
    return connection.query(
      `INSERT INTO users (firstname, lastname, email, password, postcode) VALUES ('${createUser.first_name}', '${createUser.last_name}', '${createUser.email}', '${createUser.password}', '${createUser.post_code}')`,
      callback
    );
  },
  loginUser: (loginUser, callback) => {
    return connection.query(
      `SELECT * FROM users WHERE email = '${loginUser.email}'`,
      callback
    );
  },
};

module.exports = Users;
