'use strict'


const accountSid = ''; //ACde3d2279c42e14c30ed1efcb8006152a
const authToken = ''; //b4ce349a3cb1aa67577f0179bfe7c9f8
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'probando twilio',
     from: '+12036543425',
     to: '+50241186849'
   })
  .then(message => {
            console.log(message.sid);
  });