const nodemailer = require("nodemailer");
module.exports.sendmail=async function sendmail(email,subject,bodystring,link) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'SmiFe2023178909@gmail.com',
          pass: 'fiheqhpgcqelqoct'
        }
      });
      const mailOptions = {
        from: 'SmiFe2023178909@gmail.com',
        to: email,
        subject: subject,
        html: '<h1>From SmiFe</h1><h2>'+bodystring+'</h2><a href="'+link+'">'+link+'</a>'
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
        else {
          // console.log("Email has been sent");
        }
      });
  
    } catch (error) {
      console.log(error);
    }
  }