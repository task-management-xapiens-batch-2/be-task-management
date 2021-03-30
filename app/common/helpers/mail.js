const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
let main = async (paramsEmailTo,paramsEmailFrom,title,description,status,note) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "28ed0ff7ed8fcd",
      pass: "b5dbf04f2fa865"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${paramsEmailFrom}`, // sender address
    to: `${paramsEmailTo}`, // list of receivers
    subject: `${title}, ${status}`, // Subject line
    text: `${description} `, // plain text body
    html: `Note: ${note}`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main