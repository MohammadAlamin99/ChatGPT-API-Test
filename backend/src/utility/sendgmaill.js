const nodemailer = require('nodemailer');
const sendgmaill = async (emailTo, emailSubject, text) => {

  text = text.toString();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alamin.cse.99@gmail.com',
      pass: 'xlbktvvrntuiffab'
    }
  });

  let mailOptions = {
    from: 'Verification Code <alamin.cse.99@gmail.com>',
    to: emailTo,
    subject: emailSubject,
    text: text,
  };
  return await transporter.sendMail(mailOptions);
}

module.exports = sendgmaill;

