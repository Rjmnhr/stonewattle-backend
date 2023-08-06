const Users = require("../models/users-model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const UsersController = {
  createUser: async (req, res) => {
    try {
      const data = await Users.createUser(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  loginUser: async (req, res) => {
    try {
      const data = await Users.loginUser(req.body);
      const user = data[0];

      if (!user) return res.status(401).json("Wrong username or password");

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password)
        return res.status(401).json("Wrong username or password");

      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      const { password, ...other } = user;
      res.status(200).json({ ...other, accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = UsersController;
