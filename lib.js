const express = require("express");
const { TwitchChannel } = require("twitch-channel");

const expressApp = express();
const expressPort = 3000;
expressApp.get('/', (req, res) => {
  //console.log({type: "express /", req, res});
  res.send('Hello World!');
});

expressApp.listen(expressPort, () => {
  //console.log(`[Express server started] port ${expressPort}`);
});

const channel = new TwitchChannel({
  channel: process.env.CHANNEL,
  //bot_name: "", // twitch bot login
  //bot_token: "", // create your token here https://twitchapps.com/tmi/
  client_id: process.env.CLIENT_ID, // get it by registering a twitch app https://dev.twitch.tv/dashboard/apps/create (Redirect URI is not used)
  client_secret: process.env.CLIENT_SECRET, // secret of your registered twitch app
  streamlabs_socket_token: process.env.STREAMLABS_SECRET_TOKEN, // get yours here https://streamlabs.com/dashboard#/apisettings in API TOKENS then "your socket API token"
  port: 3100, // the lib will listen to this port
  callback_url: "http://localhost:3000/", // url to your server, accessible from the outside world
  secret: process.env.SECRET, // any random string
  is_test: false // set to true to listen to test donations and hosts from streamlabs
});

module.exports = {
  channel
};
