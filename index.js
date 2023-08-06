const express = require("express");
const dotenv = require("dotenv");
const Cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./mySQL-DB");
const suburbRoutes = require("./routes/suburbs-router");
const domainRoutes = require("./routes/domain-router");
const otpAuth = require("./routes/otp-auth");
const userRoutes = require("./routes/users-route");
const tokenRoutes = require("./routes/verify-token");
const mysql = require("mysql2");
const ssh2 = require("ssh2");

//App config
const app = express();
const port = process.env.PORT || 8002;

//middleware
dotenv.config();
app.use(Cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err.message);
  });

app.use("/api/otp", otpAuth);
app.use("/api/suburbs", suburbRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);

app.listen(port, () => console.log(`server is up on ${port}`));
