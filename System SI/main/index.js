const TelegramBot = require('node-telegram-bot-api');

let activeSI = false;
let activeconstants = false;
let number = 0;
let units = 0;

const SI = require('./SIsystem.js');
const constants = require('./constants.js');
const text = require('./text.js');

const TOKEN = '?';

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

// S-Y-S-T-E-M-S-I:

bot.onText(/\/systemsi/, (msg) => {
  const chatId = msg.chat.id;
  activeSI = true;
  bot.sendMessage(chatId, 'Enter a value:');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (activeSI) {
    if (number) {
      if (isNaN(number)) {
        activeSI = false;
        number = 0;
        units = 0;
      } else {
        units = msg.text;
        const answer = SI(+number, units);
        activeSI = false;
        number = 0;
        units = 0;
        bot.sendMessage(chatId, 'Result: ' + answer);
      }
    } else {
      number = msg.text;
      if (isNaN(number)) {
        bot.sendMessage(chatId, 'Enter a number!');
      } else {
        bot.sendMessage(chatId, 'Enter a unit:');
      }
    }
  }
});

// C-O-N-S-T-A-N-T-S:

bot.onText(/\/constants/, (msg) => {
  const chatId = msg.chat.id;
  activeconstants = true;
  bot.sendMessage(chatId, 'Enter a constant:');
});


bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  if (activeconstants) {
    const c = constants(msg.text);
    bot.sendMessage(chatId, c);
    activeconstants = false;
  }
});

// I-N-S-T-R-U-C-T-I-O-N-S:

bot.onText(/\/instructions/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, text);
});
