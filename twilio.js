const twilio = require('./lib/twilio_config');
const client = require("twilio")(twilio.accountSid, twilio.authToken);

const sendRestaurantMessage = function() {
  console.log("sending message...");
  client.messages
    .create({
      body: "Hi there, a customer has placed an order. Please head over to Restaurant Portal to accept and provide estimated wait time",
      from: twilio.phoneNumber,
      to: "+16047236218"
    })
    .then(message => console.log("message id: " + message.sid))
    .catch(err => {
      console.log(err);
    });
};

const sendCustomerMessage = function(name, phone, waitTime) {
  console.log("sending message...");
  client.messages
    .create({
      body: `Hi ${name}, your order has been accepted! Estimated wait time: ${waitTime} minutes`,
      from: twilio.phoneNumber,
      to: phone
    })
    .then(message => console.log("message id: " + message.sid))
    .catch(err => {
      console.log(err);
    });
};

module.exports = { sendRestaurantMessage, sendCustomerMessage };
