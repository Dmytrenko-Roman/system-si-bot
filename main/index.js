'use strict';

const TelegramBot = require('node-telegram-bot-api');

const info = {
  activeSI: false,
  activeconstants: false,
  number: 0,
  units: 0,
};

const SI = require('./SIsystem.js');
const constants = require('./constants.js');
const text = require('./text.js');

const TOKEN = process.env.TOKEN;

const url = process.env.APP_URL || 'https://system-si.herokuapp.com/';

const bot = new TelegramBot(TOKEN, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${url}/bot${TOKEN}`);

// For local:
// const bot = new TelegramBot(TOKEN, { polling: true });

// S-Y-S-T-E-M-S-I:

bot.onText(/\/systemsi/, msg => {
  const chatId = msg.chat.id;
  info.activeSI = true;
  bot.sendMessage(chatId, 'Enter a value:');
});

bot.on('message', msg => {
  const chatId = msg.chat.id;

  if (info.activeSI) {
    if (info.number) {
      if (isNaN(info.number)) {
        info.activeSI = false;
        info.number = 0;
        info.units = 0;
      } else {
        info.units = msg.text;
        const answer = SI(+info.number, info.units);
        info.activeSI = false;
        info.number = 0;
        info.units = 0;
        bot.sendMessage(chatId, 'Result: ' + answer);
      }
    } else {
      info.number = msg.text;
      const check = isNaN(info.number) ?
        'Result: Enter a number!' : 'Enter a unit:';
      bot.sendMessage(chatId, check);
    }
  }
});

// C-O-N-S-T-A-N-T-S:

bot.onText(/\/constants/, msg => {
  const chatId = msg.chat.id;
  info.activeconstants = true;
  bot.sendMessage(chatId, 'Enter a constant:');
});


bot.on('message', msg => {

  const chatId = msg.chat.id;

  if (info.activeconstants) {
    const c = constants(msg.text);
    bot.sendMessage(chatId, c);
    info.activeconstants = false;
  }
});

// I-N-S-T-R-U-C-T-I-O-N-S:

bot.onText(/\/instructions/, msg => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, text);
});
