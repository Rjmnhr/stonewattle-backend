const Suburbs = require("../models/suburbs-model");

// class SuburbsController {
//   static getAllSuburbs(req, res) {
//     console.log("fetching...");
//     try {
//       const suburbs = Suburbs.getAll();
//       console.log("suburbs", suburbs);

//       res.json(suburbs);
//     } catch (error) {
//       console.error("Error fetching suburbs:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

const SuburbsController = {
  getAll: function (req, res) {
    Suburbs.getAll(function (err, data) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json(data);
      }
    });
  },
};

module.exports = SuburbsController;
