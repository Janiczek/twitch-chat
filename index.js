const {channel} = require('./lib');
const colors = require('colors');
const {stripColors} = colors;
const size = require('window-size');

/////////////////////////////////////////////

const testColors = () => console.log(
 '0'.black + '1'.red + '2'.green + '3'.yellow + '4'.blue + '5'.magenta + '6'.cyan + '7'.white + '8'.gray
);

const wrap = (str) => {
  const stringLength = stripColors(str).length;
  const terminalSize = size.get();
  const lineLength = Math.min(stringLength, terminalSize.width);
  const lines = '-'.repeat(lineLength).gray;
  return `${lines}\n${str}\n${lines}`;
};


const debug = (msg) => console.log(wrap(
  '[Script debug] '.gray + msg.green
));

const info = (msg) => console.log(wrap(
  '['.gray + 'Script'.green + '] '.gray + msg.green
));

const error = (msg) => console.log(wrap(
  '['.gray + 'Script error'.red + '] '.gray + msg.green
));

// chat is the only thing that doesn't get extra '--------' lines
const chat = ({viewerName,message}) => console.log(
  viewerName.cyan + ': '.gray + message
)

const cheer = ({viewerName,amount,message}) => console.log(wrap(
  '['.gray + 'Cheer'.yellow + '] '.gray + viewerName.cyan + ' cheered '.green + amount.yellow + ' bits: '.green + message
));

const sub = ({viewerName,message,plan}) => console.log(wrap(
  '['.gray + `Sub: ${plan}`.yellow + '] '.gray + viewerName.cyan + ' subscribed: '.green + message
));

const resub = ({viewerName,message,months,plan}) => console.log(wrap(
  '['.gray + `Resub: ${plan}`.yellow + '] '.gray + viewerName.cyan + ' resubscribed for '.green + months.yellow + ' months: '.green + message
));

const subgift = ({viewerName,recipientName,plan}) => console.log(wrap(
  '['.gray + `Subgift: ${plan}`.yellow + '] '.gray + viewerName.cyan + ' gifted sub to '.green + recipientName.cyan
));

const host = ({viewerName,viewers}) => console.log(wrap(
  '['.gray + 'Host'.magenta + '] '.gray + viewerName.cyan + ' hosted with '.green + viewers.magenta + ' viewers'.green
));

const raid = ({viewerName,viewers}) => console.log(wrap(
  '['.gray + 'Raid'.magenta + '] '.gray + viewerName.cyan + ' raided with '.green + viewers.magenta + ' viewers'.green
));

const follow = ({viewerName}) => console.log(wrap(
  '['.gray + 'Follow'.magenta + '] '.gray + viewerName.cyan + ' started following'.green
));

const ban = ({viewerName}) => console.log(wrap(
  '['.gray + 'Ban'.red + '] '.gray + viewerName.cyan + ' got banned'.green
));

const streamBegin = ({game}) => console.log(wrap(
  '['.gray + 'Stream begun'.blue + '] '.gray + 'Theme is: '.green + game.blue
));

const streamChangeGame = ({game}) => console.log(wrap(
  '['.gray + 'Stream changed'.blue + '] '.gray + 'New theme is: '.green + game.blue
));

const streamEnd = () => console.log(wrap(
  '['.gray + 'Stream ended'.blue + ']'.gray
));

const streamlabsDonation = ({viewerName,amount,currency,message}) => console.log(wrap(
  '['.gray + 'Donation'.yellow + '] '.gray + viewerName.cyan + ' donated '.green + `${amount} ${currency}`.yellow + ': '.green + message
));

/////////////////////////////////////////////

channel.on("debug", debug);
channel.on("info", info);
channel.on("error", error);
 
channel.on("chat", chat);
channel.on("cheer", cheer);

// for subs/resubs/subgifts, plan === "1000", "2000", "3000" or "Prime". See msg-param-sub-plan here https://dev.twitch.tv/docs/irc/tags/#usernotice-twitch-tags
channel.on("sub", sub);
channel.on("resub", resub);
channel.on("subgift", subgift);

// you need to provide the streamlabs_socket_token option to catch "host" events
channel.on("host", host);
channel.on("raid", raid);
channel.on("follow", follow);

// you need to make the bot moderator of the channel to catch "ban" events
channel.on("ban", ban);

channel.on("stream-begin", streamBegin);
channel.on("stream-change-game", streamChangeGame);
channel.on("stream-end", streamEnd);

channel.on("streamlabs/donation", streamlabsDonation);

/////////////////////////////////////////////

//testColors();

//debug('debug');
//info('info');
//error('error');
//chat({viewerName:'viewerName',message:'message'});
//cheer({viewerName:'viewerName',amount:'100',message:'message'});
//sub({viewerName:'viewerName',plan:'1000',message:'message'});
//resub({viewerName:'viewerName',plan:'1000',months:'12',message:'message'});
//subgift({viewerName:'viewerName',recipientName:'recipientName',plan:'1000'});
//host({viewerName:'viewerName',viewers:'10'});
//raid({viewerName:'viewerName',viewers:'10'});
//follow({viewerName:'viewerName'});
//ban({viewerName:'viewerName'});
//streamBegin({game:'game'});
//streamChangeGame({game:'game'});
//streamEnd();
//streamlabsDonation({viewerName:'viewerName',amount:'12',currency:'USD',message:'message'});

/////////////////////////////////////////////

channel.connect();
