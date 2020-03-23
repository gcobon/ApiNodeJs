"use strict";

require('dotenv').config()

console.log('sid: ', process.env.TWILIO_ACCOUNT_SID);
console.log('PORT: ', process.env.PORT);

/*
const accountSid = 'AC55efc0483c64c3a815ccfb2a100814aa';
const authToken = 'c05469d048383e8de67804c89ead7803';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: "All in the game, yo",
    from: "+12036543425",
    to: "+50241186849"
  })
  .then(message => {
    console.log(message.sid);
  });
*/