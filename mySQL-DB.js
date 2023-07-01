const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD_SQL,
  database: process.env.DATABASE_SQL,
});

module.exports = connection;
