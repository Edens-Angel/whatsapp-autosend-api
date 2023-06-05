const express = require("express");
require('dotenv').config();

const testMessage = process.env.message
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER
const myNumber = process.env.MY_NUMBER
const herNumber = process.env.SU_NUMBER
const port = process.env.PORT || 3000

const client = require("twilio")(accountSid, authToken)
const app = express();

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

const sendMessage = (res, to, message) => {
    client.messages.create({
        to: `whatsapp:${to}`,
        from: `whatsapp:${twilioNumber}`,
        body: message
    }).then(({sid}) => res.json(sid))
    .catch(res.json)
}

app.get("/env-test", (_, res) => {
    const message = testMessage || "Env variable 'message' has not been set"
    console.log(message)
    
    res.json(message)
})

app.post("/send-amor", (_, res) => {
    const message = "Por favor, no mande una mensaje a este numbero pero bulbul quiere decirte que te ama :D"
    console.log('Message to amor')

    sendMessage(res, herNumber, message)
})

app.post("/send-me", (_, res) => {
    console.log("message send to me")
    const message = "this is a automated message"

    sendMessage(res, myNumber, message)
})
