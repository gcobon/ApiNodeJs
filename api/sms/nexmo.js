'use strict'

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '', //620b6131
  apiSecret: '', //TvlV00YIt70941A2
});

const from = 'Nexmo';
const to = '50241186849';
const text = 'Hugo sos bien Hueco';

nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})