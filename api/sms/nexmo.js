'use strict'

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '', 
  apiSecret: '', 
});

const from = 'Nexmo';
const to = '';
const text = '';

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