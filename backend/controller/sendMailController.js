module.exports = {
    sendEmail
};

var nodemailer = require("nodemailer");
require("dotenv").config();

//Node Mailer Config
async function sendEmail(mailTemplate) {
    try {
        var mailOptions = {
            from: "adarshk.dev@gmail.com",
            to: mailTemplate.receiver,
            subject: mailTemplate.subject,
            html: mailTemplate.html,
        };
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "adarshk.dev@gmail.com",
                pass: "Adarsh@955",
            },
        });

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    resolve(false);
                } else {
                    console.log("Email sent: " + info.response);
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}