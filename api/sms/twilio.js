'use strict'


const accountSid = ''; 
const authToken = ''; 
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'cuerpo del sms',
     from: '+',
     to: '+'
   })
  .then(message => {
            console.log(message.sid);
  });