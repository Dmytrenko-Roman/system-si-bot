'use strict';

const prefixes = {
  E: 18, // Exa
  P: 15, // Peta
  T: 12, // Tera
  G: 9, // Giga
  M: 6, // Mega
  k: 3, // kilo
  h: 2, // hecto
  d: -1, // deci
  c: -2, // centi
  m: -3, // milli
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
  1: [0, 'Pa'],
  2: [0, 'Gn'],
  3: [0, 'Tl'],
  4: [0, 'kd'],
};

const fix = {
  Pa: '1',
  Gn: '2',
  Tl: '3',
  kd: '4',
};

const si = function(value, unit) {
  if (isNaN(+unit)) {
    for (const f of Object.keys(fix)) {
      if (unit === f.toString()) {
        unit = fix[f];
      }
    }
    if (unit === '°C') {
      value += 273;
      unit = 'K';
    }
    if (unit === 'h') {
      value *= 3600;
      unit = 's';
    }
    if (unit.toString().includes('mc')) {
      value *= 10 ** (-6);
      unit = unit.substr(1);
      unit = unit.substr(1);
    }
    for (const prefix of Object.keys(prefixes)) {
      const p = prefixes[prefix];
      if (unit[0] === prefix.toString()) {
        value *= 10 ** p;
        unit = unit.substr(1);
        if (unit.includes('m^2')) {
          value *= 10 ** p;
        }
        if (unit.includes('m^3')) {
          value *= 10 ** (2 * p);
        }
        if (unit.includes('m/h')) {
          value *= 10 ** (-3) / 3.6;
          unit = 'm/s';
        }
      }
    }

    // Debug:

    for (const k in debug) {
      if (unit === k.toString()) {
        value *= 10 ** debug[k][0];
        unit = debug[k][1];
      }
    }
    return `${value} ${unit}`;
  } else {
    return 'Enter a unit!';
  }
};

// const infoSI = SI(2000000, '1');
// console.log(infoSI);

module.exports = si;
