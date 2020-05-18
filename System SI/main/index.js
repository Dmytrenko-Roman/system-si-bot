const TelegramBot = require('node-telegram-bot-api');

let active = false;
let number = 0;
let units = 0;
let n;
let u;

const TOKEN = 'tsssssss';

const bot = new TelegramBot(TOKEN, {
  polling: true
});

let given = {};

const prefixes = {

  'm': -3, // milli
  'Z': 21, // Zeta
  'E': 18, // Exa
  'P': 15, // Peta
  'T': 12, // Tera
  'G': 9, // Giga
  'M': 6, // Mega
  'k': 3, // kilo
  'h': 2, // hecto
  'd': -1, // deci
  'c': -2, // centi
  'n': -9, // nano
  'p': -12, // pico
  'f': -15, // femto
  'a': -18, // atto

};

const SI = function(info) {
  for (let key in info) {
    for (let prefix in prefixes) {
      if (info[key][1][0] === prefix) {
        info[key][0] = info[key][0] * Math.pow(10, prefixes[prefix]);
        info[key][1] = info[key][1].substr(1);
        if (info[key][1].includes('m^2')) {
          info[key][0] = info[key][0] * Math.pow(10, prefixes[prefix]);
        }
        if (info[key][1].includes('m^3')) {
          info[key][0] = info[key][0] * Math.pow(Math.pow(10, prefixes[prefix]), 2);
        }    
      }

      // Exceptions:

      if (info[key][1].includes('mc')) {
        info[key][0] = info[key][0] * Math.pow(10, -6);
        info[key][1] = info[key][1].substr(2);
      }
      if (info[key][1] === 'gm/s') {
        info[key][0] = info[key][0] * Math.pow(10, -3);
        info[key][1] = 'kgm/s';
      }
      if (info[key][1][0] === 'g') {
        info[key][0] = info[key][0] * Math.pow(10, -3);
        info[key][1] = 'kg';
      }
      if (info[key][1][0] === 'l') {
        info[key][0] = info[key][0] * Math.pow(10, -3);
        info[key][1] = 'm^3';
      }
      if (info[key][1] === '') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'm';
      }
      if (info[key][1] === '/c') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'm/c';
      }
      if (info[key][1] === '/c^2') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'm/c^2';
      }
      if (info[key][1] === '^3') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'm^3';
      }
      if (info[key][1] === '^2') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'm^2';
      }
      if (info[key][1] === 'd') {
        info[key][0] = info[key][0] * Math.pow(10, -3);
        info[key][1] = 'kd';
      }
      if (info[key][1] === 'ol') {
        info[key][0] = info[key][0] * Math.pow(10, 3);
        info[key][1] = 'mol';
      }
    }
  }    
  return info;
};

bot.onText(/\/systemsi/, (msg) => {
  const chatId = msg.chat.id;
  active = true;
  bot.sendMessage(chatId, 'Enter a value:');
})

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