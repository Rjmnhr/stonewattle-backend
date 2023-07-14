const router = require("express").Router();
const nodemailer = require("nodemailer");
const otplib = require("otplib");
const NodeCache = require("node-cache");

const otpCache = new NodeCache();

router.post("/send-otp", (req, res) => {
  const { email } = req.body;

  const secret = otplib.authenticator.generateSecret();
  const otp = otplib.authenticator.generate(secret);

  // Store OTP in cache with the email as the key
  otpCache.set(email, otp, 600); // Set OTP to expire in 10 minutes (600 seconds)

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "rjmnhr9551@gmail.com",
      pass: "kkrmsdqpdusjmwbs",
    },
  });

  // Set up email data
  const mailOptions = {
    from: "rjmnhr9551@gmail.com",
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    } else {
      res.status(200).json("Otp send successfully");
    }
  });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const storedOTP = otpCache.get(email);

  if (!storedOTP) {
    res.status(400).json({ message: "OTP data not found" });
    return;
  }

  if (storedOTP === otp) {
    // Clear the secret and token from session storage after successful verification

    otpCache.del(email);

    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

module.exports = router;
