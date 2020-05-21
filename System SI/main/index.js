const TelegramBot = require('node-telegram-bot-api');

let activeSI = false;
let active_constants = false;
let number = 0;
let units = 0;
let n;
let u;

const SI = require('./SIsystem.js');
const constants = require('./constants.js');
const text = require('./text.js');

const TOKEN = 'tsssssssssssssssssss';

const bot = new TelegramBot(TOKEN, {
  polling: true
});

// S-Y-S-T-E-M-S-I:

bot.onText(/\/systemsi/, (msg) => {
  const chatId = msg.chat.id;
  activeSI = true;
  bot.sendMessage(chatId, 'Enter a value:');
})

let given = {};

bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  if (activeSI) {
    let arr = []; 
    if (number) {
      units = msg;
      n = number.text;
      u = units.text;
      arr.push(+n, u);
      given.A = arr;
      const givenSI = SI(given);
      answer_number = givenSI.A[0];
      answer_units = givenSI.A[1];
      activeSI = false;
      number = 0;
      units = 0;
      bot.sendMessage(chatId, 'Result: '+answer_number+' '+answer_units);
    } else {
      number = msg;
      arr.push(number);
      bot.sendMessage(chatId, 'Enter a unit:');
    } 
    console.log(arr)
    console.log(given);
  }
});

// C-O-N-S-T-A-N-T-S:

bot.onText(/\/constants/, (msg) => {
  const chatId = msg.chat.id;
  active_constants = true;
  bot.sendMessage(chatId, 'Enter a constant:');
});


bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  if (active_constants) {
    let c = constants(msg.text);
    bot.sendMessage(chatId, c);
    active_constants = false;
  }
});

// I-N-S-T-R-U-C-T-I-O-N-S:

bot.onText(/\/instructions/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, text);
});

