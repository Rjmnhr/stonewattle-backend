const express = require("express");
const TrackDataController = require("../controller/track-data-controller");
const router = express.Router();

const captureIpAddress = (req, res, next) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  req.userIpAddress = ipAddress;
  next();
};

router.post("/store1", captureIpAddress, TrackDataController.saveTrackedData1);
router.post("/store2", captureIpAddress, TrackDataController.saveTrackedData2);
router.post("/store3", captureIpAddress, TrackDataController.saveTrackedData3);

module.exports = router;
