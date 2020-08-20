// Set the bot token from MeBots in .env under BOT_TOKEN
let mebots = require('mebots');
let bot = new mebots.Bot('your_bot_shortname_here', process.env.BOT_TOKEN);

// Setup our web routing
const express = require("express");
const app = express();

// Library to send POST requests simply
const axios = require('axios')

// Simple GET route to ping the server
app.use(express.json())
app.get("/", function(req, res) {
  res.sendStatus(200)
});

// Use this route as the callback URL for the bot
// Example: https://shadow.herokuapp.com/receive
app.post('/receive', async (req, res)  => {
  console.log(req.body)
  let cmd = req.body.text
  
  if (cmd === "/ping") {
    sendmsg("Pong!", req.body.group_id)
  }
  
})

// Listens for requests
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// Function to get the bot with MeBots and send a message
function sendmsg(msg, groupid) {
  bot.getInstance(groupid).then((instance) => {
  axios.post('https://api.groupme.com/v3/bots/post', {"text" : msg, "bot_id" : instance.id})
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
  });
}
