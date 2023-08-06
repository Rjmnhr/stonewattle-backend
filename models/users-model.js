const pool = require("../mySQL-DB");
const CryptoJS = require("crypto-js");

const Users = {
  createUser: async (createUser) => {
    const connection = await pool.getConnection();

    try {
      const password = CryptoJS.AES.encrypt(
        createUser.password,
        process.env.SECRET_KEY
      ).toString();
      let query = `INSERT INTO users (name,email, password, postcode,state,phone_number,no_of_properties, portfolio,invest) VALUES 
      ('${createUser.userName}', '${createUser.email}', '${password}', '${createUser.post_code}', '${createUser.state}', '${createUser.phone}',  '${createUser.property}',  '${createUser.portfolio}','${createUser.invest}')`;
      const [rows, fields] = await connection.query(query);
      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  loginUser: async (loginUser) => {
    const connection = await pool.getConnection();
    try {
      let query = `SELECT * FROM users WHERE email = '${loginUser.email}'`;
      const [rows, fields] = await connection.query(query);
      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};

module.exports = Users;
