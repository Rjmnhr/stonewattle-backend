const Users = require("../models/users-model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "5d" });
}

const UsersController = {
  createGoogleUser: async (req, res) => {
    try {
      const existingUser = (await Users.loginUser(req.body))[0];

      if (existingUser) {
        if (existingUser.password === "Google password") {
          const accessToken = generateAccessToken(existingUser.id);

          const { password, ...other } = existingUser;
          return res.status(200).json({ ...other, accessToken });
        }

        return res.status(401).json("User info doesn't match with Google user");
      } else {
        const CreateUserData = await Users.createGoogleUser(req.body);

        if (!CreateUserData)
          return res.status(402).json("creating Google user failed");

        const newUser = (await Users.loginUser(req.body))[0];
        const accessToken = generateAccessToken(newUser.id);

        const { password, ...other } = newUser;
        return res.status(200).json({ ...other, accessToken });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
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
      const userData = (await Users.loginUser(req.body))[0];

      if (!userData) return res.status(401).json("Wrong username or password");

      const bytes = CryptoJS.AES.decrypt(
        userData.password,
        process.env.SECRET_KEY
      );
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password)
        return res.status(401).json("Wrong username or password");

      const accessToken = generateAccessToken(userData.id);
      const { password, ...other } = userData;
      return res.status(200).json({ ...other, accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  changePassword: async (req, res) => {
    try {
      const password = req.body.password;
      const email = req.body.email;
      const existingUser = (await Users.loginUser({ email: email }))[0];

      const data = await Users.ChangePassword({
        id: existingUser.ID,
        password: password,
      });
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = UsersController;
