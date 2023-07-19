const Users = require("../models/users-model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const UsersController = {
  createUser: (req, res) => {
    Users.createUser(req.body, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json(data);
      }
    });
  },
  loginUser: (req, res) => {
    Users.loginUser(req.body, (err, data) => {
      if (err) {
        throw err;
      }

      const user = data[0];

      if (!user) return res.status(401).json("Wrong username or password");

      // const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      // const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      // if (originalPassword !== req.body.password)
      //   return res.status(401).json("Wrong username or password");

      if (user.password !== req.body.password)
        return res.status(400).json("Wrong username or password");

      // const accessToken = jwt.sign(
      //   {
      //     id: user.id,
      //   },
      //   process.env.SECRET_KEY,
      //   { expiresIn: "5d" }
      // );

      // const { password, ...other } = user;
      // res.status(200).json({ ...other, accessToken });
      res.status(200).json("logged successfully");
    });
  },
};

module.exports = UsersController;
