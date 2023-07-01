const express = require("express");
const dotenv = require("dotenv");
const Cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./mySQL-DB");
const suburbRoutes = require("./routes/suburbs-router");
const domainRoutes = require("./routes/domain-router");

//App config
const app = express();
const port = process.env.PORT || 8002;

//middleware
dotenv.config();
app.use(Cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use("/api/suburbs", suburbRoutes);
app.use("/api/domain", domainRoutes);

app.listen(port, () => console.log(`server is up on ${port}`));
