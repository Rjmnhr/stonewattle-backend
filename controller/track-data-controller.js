const TrackedData = require("../models/track-data-model");

const TrackDataController = {
  saveTrackedData: async (req, res) => {
    console.log(req.body);
    try {
      const dataToSave = {
        ...req.body,
        ipAddress: req.userIpAddress, // Add the IP address to the data
      };

      const data = await TrackedData.saveTrackedData(dataToSave);
      res.status(200).json("data stored successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = TrackDataController;
