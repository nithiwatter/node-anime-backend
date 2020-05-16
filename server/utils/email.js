const nodemailer = require('nodemailer');

const sendEmail = (options) => {
  // Create a transporter/sender service
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: 'Anime Backend <animebackend@email.io',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the mail
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
