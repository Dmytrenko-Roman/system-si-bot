'use strict';

let given = {

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

  a: [1, 'm/c^2'],

  Sp: [1, 'm/c'],

  V2: [1 * Math.pow(10, 9), 'mm^3'],

  S2: [1, 'm^2'],

  n: [1, 'mol'],

  p1: [25, 'kgm/s'],

  p2: [25, 'Mgm/s'],

  Iv: [25, 'kd'],

};

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

const infoSI = SI(given);

console.log(infoSI);
