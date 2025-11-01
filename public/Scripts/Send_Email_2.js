var log = console.log;
const nodemailer = require('nodemailer');
//var Send_From_Email = "mypdfgenerator@outlook.com";
var Send_From_Email = "kevin.foendoe@outlook.com";
var Send_To_Email = "kfoendoe1@gmail.com";
var Logged_In_User = "feelfreeathomeg@gmail.com";
//ABoltFromTheBlue156

//async function sendEmail(Arr_Campaign, Campaign_Duration, Desired_Campaign_Start_Date, Billboard_Owner_Data) {
async function sendEmail_2(Arr_Final_Email_Objects) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //service: 'outlook',
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: Send_From_Email,
      pass: process.env.EMAIL_PASSWORD_2
    }
  });


 
  

  
  for (let i = 0; i < Arr_Final_Email_Objects.length; i++) {
    //const { Recipient_Email, Email_Body } = Arr_Final_Email_Objects[i];
    Recipient_Email = Arr_Final_Email_Objects[i]["Recipient_Email"];
    Email_Body = Arr_Final_Email_Objects[i]["Email_Body"];



    let mailOptions = {
      from: Send_From_Email,
      to: Recipient_Email,
      cc: Logged_In_User,
      subject: "Support Needed",
      text: Ask_A_Question_Email_Body
    };

    

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${Recipient_Email}`);
  }
  
}

module.exports = { sendEmail };