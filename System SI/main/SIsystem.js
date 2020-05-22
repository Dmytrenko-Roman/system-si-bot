'use strict';

const prefixes = {

  m: -3, // milli
  Z: 21, // Zeta
  E: 18, // Exa
  P: 15, // Peta
  T: 12, // Tera
  G: 9, // Giga
  M: 6, // Mega
  k: 3, // kilo
  h: 2, // hecto
  d: -1, // deci
  c: -2, // centi
  n: -9, // nano
  p: -12, // pico
  f: -15, // femto
  a: -18, // atto

};

const debug = {

  'gm/s': [-3, 'kgm/s'],
  g: [-3, 'kg'],
  l: [-3, 'm^3'],
  '': [3, 'm'],
  '/s': [3, 'm/s'],
  '/s^2': [3, 'm/s^2'],
  '^3': [3, 'm^3'],
  '^2': [3, 'm^2'],
  d: [-3, 'kd'],
  ol: [3, 'mol'],

};

const SI = function (value, unit) {
  if (typeof value === 'number' && typeof unit === 'string') {
    for (const prefix in prefixes) {
      if (unit[0] === prefix.toString()) {
        value = value * Math.pow(10, prefixes[prefix]);
        unit = unit.substr(1);
        if (unit.includes('m^2')) {
          value = value * Math.pow(10, prefixes[prefix]);
        }
        if (unit.includes('m^3')) {
          value = value * Math.pow(Math.pow(10, prefixes[prefix]), 2);
        }
      }
    
    }
  
  // Exceptions:

    for (const k in debug) {
      if (unit === k.toString()) {
        value = value * Math.pow(10, debug[k][0]);
        unit = debug[k][1];
      }
    }
    return (value + ' ' + unit).toString();
  } else {
    return 'Enter a number/a unit!'
  }
};

// const infoSI = SI(10, 'cGn');
// console.log(infoSI);

module.exports = SI;
