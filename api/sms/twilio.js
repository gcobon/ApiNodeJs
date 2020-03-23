"use strict";

require('dotenv').config()

console.log('sid: ', );
console.log('PORT: ', process.env.PORT);


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: "All in the game, yo",
    from: "+",
    to: "+"
  })
  .then(message => {
    console.log(message.sid);
  });
