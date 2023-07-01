const router = require("express").Router();

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const connection = require("../mySQL-DB");

//signup
router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, post_code } = req.body;

  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();

  const query = `INSERT INTO users (firstname, lastname, email, password, postcode) VALUES ('${first_name}', '${last_name}', '${email}', '${password}', '${post_code}')`;
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send("User added successfully");
  });
});

// router.get("/users", (req, res) => {
//   User.find()
//     .then((data) => res.send(data))
//     .catch((err) => res.send(err));
// });

//login
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(401).json("Wrong username or password");

//     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
//     if (originalPassword !== req.body.password)
//       return res.status(401).json("Wrong username or password");

//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.SECRET_KEY,
//       { expiresIn: "5d" }
//     );

//     const { password, ...other } = user._doc;
//     res.status(200).json({ ...other, accessToken });
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      res.send("wrong username or password");
      throw error;
    }
    console.log("results", results);
    res.send("logged successfully");
    // const user = results;
    // if (!user) return res.status(401).send("Wrong username or password");

    // const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    // const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    // if (originalPassword !== req.body.password)
    //   return res.status(401).send("Wrong username or password");

    // const accessToken = jwt.sign(
    //   {
    //     id: user.id,
    //   },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "5d" }
    // );

    // const { password, ...other } = user._doc;
    // res.status(200).send({ ...other, accessToken });
  });
});

module.exports = router;
