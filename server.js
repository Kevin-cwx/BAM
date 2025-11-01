const express = require('express');
const app = express();
const port = 7210;

require('dotenv').config();
const path = require('path');
const { sendEmail } = require('./public/Scripts/Send_Email.js');
app.use(express.json());

//const nodemailer = require('nodemailer');

// Define a route for the homepage
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'Landing_Page.html')); 
    res.sendFile(path.join(__dirname, './public/Screens/Landing_Page.html'));

});

// Define a route to serve static files (e.g., CSS, JavaScript, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle the button click
app.post('/send-email', (req, res) => {
    //const { Arr_Campaign, Campaign_Duration, Desired_Campaign_Start_Date, Billboard_Owner_Data } = req.body;
   // sendEmail(Arr_Campaign, Campaign_Duration, Desired_Campaign_Start_Date, Billboard_Owner_Data);
   const { Arr_Final_Email_Objects } = req.body;
   sendEmail(Arr_Final_Email_Objects);
   
    res.json({ message: 'Email sent' });
});


//sendEmail();

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

var reload = require('reload')
app.listen(3000, () => {
    
})
reload(app);