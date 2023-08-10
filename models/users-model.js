const pool = require("../mySQL-DB");
const CryptoJS = require("crypto-js");

const Users = {
  createGoogleUser: async (createGoogleUser) => {
    const connection = await pool.getConnection();

    try {
      const password = "Google password";

      const query = `
      INSERT INTO users (first_name, last_name, email, password, postcode, state, phone_number, no_of_properties, portfolio, invest)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const [rows] = await connection.query(query, [
        createGoogleUser.first_name,
        createGoogleUser.last_name,
        createGoogleUser.email,
        password,
        createGoogleUser.post_code,
        createGoogleUser.state,
        createGoogleUser.phone,
        createGoogleUser.property,
        createGoogleUser.portfolio,
        createGoogleUser.invest,
      ]);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  createUser: async (createUser) => {
    const connection = await pool.getConnection();

    try {
      const password = CryptoJS.AES.encrypt(
        createUser.password,
        process.env.SECRET_KEY
      ).toString();
      const query = `
        INSERT INTO users (first_name, last_name, email, password, postcode, state, phone_number, no_of_properties, portfolio, invest)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [rows] = await connection.query(query, [
        createUser.first_name,
        createUser.last_name,
        createUser.email,
        password,
        createUser.post_code,
        createUser.state,
        createUser.phone,
        createUser.property,
        createUser.portfolio,
        createUser.invest,
      ]);

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
