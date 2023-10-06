const TrackedData = require("../models/track-data-model");

const TrackDataController = {
  saveTrackedData1: async (req, res) => {
    try {
      const dataToSave = {
        ...req.body,
        ipAddress: req.userIpAddress, // Add the IP address to the data
      };

      const data = await TrackedData.saveTrackedData1(dataToSave);
      res.status(200).json("data stored successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  saveTrackedData2: async (req, res) => {
    try {
      const dataToSave = {
        ...req.body,
        ipAddress: req.userIpAddress, // Add the IP address to the data
      };

      const data = await TrackedData.saveTrackedData2(dataToSave);
      res.status(200).json("data stored successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  saveTrackedData3: async (req, res) => {
    try {
      const dataToSave = {
        ...req.body,
        ipAddress: req.userIpAddress, // Add the IP address to the data
      };

      const data = await TrackedData.saveTrackedData3(dataToSave);
      res.status(200).json("data stored successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = TrackDataController;
