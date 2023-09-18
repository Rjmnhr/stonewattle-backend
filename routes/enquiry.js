const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/send-enquiry", (req, res) => {
  const { first_name, last_name, email, details } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "info@2ndstorey.com",
      pass: "secondstorey",
    },
  });

  // Set up email data
  const mailOptions = {
    from: "info@2ndstorey.com",
    to: "indradeep.mazumdar@gmail.com",
    subject: `2nd Storey enquiry from ${first_name}  ${last_name}`,
    text: `Dear 2nd Storey,
    
We have received an enquiry from ${first_name} ${last_name} through the contact us section of our website. 
The details of the enquiry are as follows:
First Name: ${first_name}
Last Name: ${last_name}
Email: ${email}
Enquiry Details: ${details}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending Enquiry" });
    } else {
      res.status(200).json("Enquiry send successfully");
    }
  });
});

module.exports = router;
