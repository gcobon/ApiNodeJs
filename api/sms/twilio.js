'use strict'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'cuerpo del sms',
     from: '+12036543425',
     to: '+50241186849'
   })
  .then(message => {
            console.log(message.sid);
  });