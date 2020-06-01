'use strict';

const constants = {
  Na: 'Avogadro constant: 6.022×10⁻²³ (1/Mol)',
  k: 'Bolzmann constant: 1.38×10⁻²³ (J/K)',
  e: 'Elementary charge: 1.602×10⁻¹⁹ (C)',
  G: 'Newtonian constant of gravitation: 6.67×10⁻¹¹ (m³/kg×s²)',
  h: 'Planck constant: 6.626×10⁻³⁴ (J×s)',
  c: 'Speed of light in vacuum: 3×10⁸ (m/s)',
  ε0: 'Vacuum electric permittivity: 8.854×10⁻¹² (F/m)',
  μ0: 'Vacuum magnetic permeability: 1.256×10⁻⁶ (N/A²)',
  me: 'Electron mass: 9.1×10⁻³¹ (kg)',
  mp: 'Proton mass: 1.672×10⁻²⁷ (kg)',
  mn: 'Neutron mass: 1.675×10⁻²⁷ (kg)',
  KJ: 'Josephson constant: 483597.84×10⁹ (Hz/V)',
  R: 'Molar gas constant: 8.3 (J/mol×K)',
  Ry: 'Rydberg constant: 10973731.568 (1/m)',
  RK: 'Von Klitzing constant: 25812.807 (Ω)',
  g: 'Gravity of Earth: 9.81 (m/s²)',
  F: 'Faraday constant: 98485 (C/mol)',
  pa: 'Atmospheric pressure: 101325 (Pa)',
  lp: 'Planck length: 1.616×10⁻³⁵ (m)',
  Mp: 'Planck mass: 2.176×10⁻⁸ (kg)',
  tp: 'Planck time: 5.391×10⁻⁴⁴ (s)',
  Tp: 'Planck temperature: 1.416×10³² (K)',
  qp: 'Planck charge: 1.875×10⁻¹⁸ (C)',
  Ep: 'Planck energy: 1.9561×10⁹ (J)',
};

const showConstant = par => {
  for (const key of Object.keys(constants)) {
    if (par === key.toString()) {
      return constants[key];
    }
  }
};

// console.log(showConstant('Na'));

module.exports = showConstant;
