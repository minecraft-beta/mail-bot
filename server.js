const express = require('express');
const app = express();
const cors = require('cors');
const port = 6969;
const nodemailer = require('nodemailer');
let emailSend;

app.use(cors());
// Middleware to parse plain text requests
app.use(express.text());

app.post('/mail', (req, res) => {
    emailSend = req.body;
    console.log('req received:', req.body);  // Logs "req received" with the email content
    res.status(200).send('Request received');

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 587,
        secure: false, // true for 465
        auth: {
            user: 'minecraft@notch.rf.gd',
            pass: process.env.PASS,
        },
    });

    // Set up the email options
    const mailOptions = {
        from: 'Minecraft <minecraft@notch.rf.gd>',
        to: `${emailSend}`,
        subject: 'Hello',
        text: 'Hello there!',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email sent to ${emailSend}` + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
