'use strict';

const assert = require('assert').strict;

// SI System:

{ 
  const fn = require('./SIsystem.js');

  const tests = [
    [1 * 10 ** (-21), 'Zm', '1 m', 'SI System: Z'],
    [1 * 10 ** (-18), 'Em', '1 m', 'SI System: E'],
    [1 * 10 ** (-15), 'Pm', '1 m', 'SI System: P'],
    [1 * 10 ** (-12), 'Tm', '1 m', 'SI System: T'],
    [1 * 10 ** (-9), 'Gm', '1 m', 'SI System: G'],
    [1 * 10 ** (-6), 'Mm', '1 m', 'SI System: M'],
    [0.001, 'km', '1 m', 'SI System: k'],
    [0.01, 'hm', '1 m', 'SI System: h'],
    [10, 'dm', '1 m', 'SI System: d'],
    [100, 'cm', '1 m', 'SI System: c'],
    [1000, 'mm', '1 m', 'SI System: m'],
    [1 * 10 ** 6, 'mcm', '1 m', 'SI System: mc'],
    [1 * 10 ** 9, 'nm', '1 m', 'SI System: n'],
    [1 * 10 ** 12, 'pm', '1 m', 'SI System: p'],
    [1 * 10 ** 15, 'fm', '1 m', 'SI System: f'],
    [1 * 10 ** 18, 'am', '1 m', 'SI System: a'],
    [1, 'm', '1 m', 'SI System: m'],
    [1, 'kg', '1 kg', 'SI System: kg'],
    [1000, 'l', '1 m^3', 'SI System: l'],
    [1, 'kgm/s', '1 kgm/s', 'SI System: kgm/s'],
    [1, 'm/s', '1 m/s', 'SI System: m/s'],
    [1, 'm/s^2', '1 m/s^2', 'SI System: m/s^2'],
    [1, 'm^3', '1 m^3', 'SI System: m^3'],
    [1, 'm^2', '1 m^2', 'SI System: m^2'],
    [1, 'kd', '1 kd', 'SI System: kd'],
    [1, 'mol', '1 mol', 'SI System: mol'],
    [+'ss', 'mm', 'Enter a number/a unit!', 'SI System: value'],
    [10, + 'mm', 'Enter a number/a unit!', 'SI System: unit'],
    [0, 'km', '0 m', 'SI System: 0'],
  ];

  console.log('------- SI System -------')

  for (const test of tests) {
    const [par1, par2, expected, name] = test;
    const result = fn(par1, par2);
    try {
      assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
      console.log(err);
    }
  };
}

// Constants:

{
  const fn = require('./constants');

  const tests = [
    ['Na', 'Avogadro constant: 6.022×10⁻²³ (1/Mol)', 'Constants: Na'],
    ['k','Bolzmann constant: 1.38×10⁻²³ (J/K)', 'Constants: k'],
    ['e', 'Elementary charge: 1.602×10⁻¹⁹ (C)', 'Constants: e'],
    ['G', 'Newtonian constant of gravitation: 6.67×10⁻¹¹ (m³/kg×s²)', 'Constants: G'],
    ['h', 'Planck constant: 6.626×10⁻³⁴ (J×s)', 'Constants: h'],
    ['c', 'Speed of light in vacuum: 3×10⁸ (m/s)', 'Constants: c'],
    ['ε0', 'Vacuum electric permittivity: 8.854×10⁻¹² (F/m)', 'Constants: ε0'],
    ['μ0', 'Vacuum magnetic permeability: 1.256×10⁻⁶ (N/A²)', 'Constants: μ0'],
    ['me', 'Electron mass: 9.1×10⁻³¹ (kg)', 'Constants: me'],
    ['mp', 'Proton mass: 1.672×10⁻²⁷ (kg)', 'Constants: mp'],
    ['KJ', 'Josephson constant: 483597.84×10⁹ (Hz/V)', 'Constants: KJ'],
    ['R', 'Molar gas constant: 8.3 (J/mol×K)', 'Constants: R'],
    ['Ry', 'Rydberg constant: 10973731.568 (1/m)', 'Constants: Ry'],
    ['RK', 'Von Klitzing constant: 25812.807 (Ω)', 'Constants: RK'],
    ['g', 'Gravity of Earth: 9.81 (m/s²)', 'Constants: g'],
    ['r', undefined, 'Constants: invalid value'],
  ];

  console.log('------- Constants -------')
  
  for (const test of tests) {
    const [par, expected, name] = test;
    const result = fn(par);
    try {
      assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
      console.log(err);
    }
  };
}
