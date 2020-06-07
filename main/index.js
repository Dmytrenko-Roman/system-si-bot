'use strict';

const TelegramBot = require('node-telegram-bot-api');

const info = {
  activesi: false,
  activeconstants: false,
  value: 0,
  unit: 0,
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
  info.activesi = true;
  bot.sendMessage(chatId, 'Enter a value:');
});

bot.on('message', msg => {
  const chatId = msg.chat.id;

  if (info.activesi) {
    if (info.value) {
      if (isNaN(info.value)) {
        info.activesi = false;
        info.value = 0;
        info.unit = 0;
      } else {
        info.unit = msg.text;
        const answer = SI(+info.value, info.unit);
        info.activesi = false;
        info.value = 0;
        info.unit = 0;
        bot.sendMessage(chatId, `Result: ${answer}`);
      }
    } else {
      info.value = msg.text;
      const check = isNaN(info.value) ?
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
