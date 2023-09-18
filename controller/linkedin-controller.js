const LinkedInData = require("../models/linkedin-model");

const LinkedInDataController = {
  getAll: async (req, res) => {
    try {
      const data = await LinkedInData.getAll(req.body);
      console.log("data", data.length);

      res.status(200).json(data);
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
};

module.exports = LinkedInDataController;
