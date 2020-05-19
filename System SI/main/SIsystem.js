'use strict';

/* let given = {

  A: [1 * Math.pow(10, -21), 'ZJ'],

  U: [1 * Math.pow(10, -18), 'EV'],

  R: [1 * Math.pow(10, -15), 'POm'],

  v: [1 * Math.pow(10, -12), 'THz'],

  F: [1 * Math.pow(10, -9), 'GN'],

  B: [1 * Math.pow(10, -6), 'MTl'],

  m: [1, 'kg'],

  l: [1, 'm'],

  t: [1, 's'],

  L: [1 * Math.pow(10, 2), 'cGn'],

  d: [1 * Math.pow(10, 3), 'mm'],

  // P: [1 * Math.pow(10, 6), 'mcW'], ?
    
  λ: [1 * Math.pow(10, 9), 'nm'],

  Φ: [1 * Math.pow(10, 12), 'pF'],

  q: [1 * Math.pow(10, 15), 'fKl'],

  V: [1 * Math.pow(10, 3), 'l'],

  S: [1 * Math.pow(10, -12), 'Mm^2'],

  a: [1, 'm/s^2'],

  Sp: [1, 'm/s'],

  V2: [1 * Math.pow(10, 9), 'mm^3'],

  S2: [1, 'm^2'],

  n: [1, 'mol'],

  p1: [25, 'kgm/s'],

  p2: [25, 'Mgm/s'],

  Iv: [25, 'kd'],

}; */

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

const debug = {
  'gm/s': [-3, 'kgm/s'],
  'g': [-3, 'kg'],
  'l': [-3, 'm^3'],
  '': [3, 'm'],
  '/s': [3, 'm/s'],
  '/s^2': [3, 'm/s^2'],
  '^3': [3, 'm^3'],
  '^2': [3, 'm^2'],
  'd': [-3, 'kd'],
  'ol': [3, 'mol'],


}

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
    }

    // Exceptions:

    for (let k in debug) {
      if (info[key][1] === k) {
        info[key][0] = info[key][0] * Math.pow(10, debug[k][0]);
        info[key][1] = debug[k][1];
      } 
    }
  }    
  return info;
};

// const infoSI = SI(given);
// console.log(infoSI);

module.exports = SI;
