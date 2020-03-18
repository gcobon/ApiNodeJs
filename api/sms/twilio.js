'use strict'


const accountSid = ''; 
const authToken = ''; 
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Un saludo de Transportes Los Halcones',
     from: '+12036543425',
     to: '+50241186849'
   })
  .then(message => {
            console.log(message.sid);
  });