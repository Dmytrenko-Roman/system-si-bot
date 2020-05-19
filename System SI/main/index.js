const TelegramBot = require('node-telegram-bot-api');

let active = false;
let number = 0;
let units = 0;
let n;
let u;

const SI = require('./SIsystem.js')

const TOKEN = '1187295605:AAEmlpv3-6xW_jfmXD4ViepNe3kTzBo_DR4';

const bot = new TelegramBot(TOKEN, {
  polling: true
});

bot.onText(/\/systemsi/, (msg) => {
  const chatId = msg.chat.id;
  active = true;
  bot.sendMessage(chatId, 'Enter a value:');
})

let given = {};

bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  if (active) {
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
      active = false;
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
