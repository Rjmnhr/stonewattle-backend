const Suburbs = require("../models/suburbs-model");

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
  getById: (req, res) => {
    const id = req.params.id;

    Suburbs.getById(id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(result);
      }
    });
  },
};

module.exports = SuburbsController;
