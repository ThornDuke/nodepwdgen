/**
 * pwgen
 * A strong password generator for Node
 *
 * First edit 2024-02-12
 */
'use strict';
const crypto = require('node:crypto');

/**
 * TODO
 * .generatePassword({ ... })
 */

const defaults = {
  quantity: {
    type: 'number',
    min: 1,
    max: 100,
    default: 10,
  },
  length: {
    type: 'number',
    min: 8,
    max: 128,
    default: 12,
  },
  uppercases: {
    type: 'string',
    minLength: '1',
    maxLength: '260',
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  uppercaseOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    default: 1,
  },
  addUppercases: {
    type: 'boolean',
    default: true,
  },
  lowercases: {
    type: 'string',
    minLength: '1',
    maxLength: '260',
    default: 'abcdefghijklmnopqrstuvwxyz',
  },
  lowercaseOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    default: 1,
  },
  addLowercases: {
    type: 'boolean',
    default: true,
  },
  digits: {
    type: 'string',
    minLength: '1',
    maxLength: '100',
    default: '0123456789',
  },
  digitOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    default: 1,
  },
  addDigits: {
    type: 'boolean',
    default: true,
  },
  symbols: {
    type: 'string',
    minLength: '1',
    maxLength: '100',
    default: '£$%&*§#@',
  },
  symbolOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    default: 1,
  },
  addSymbols: {
    type: 'boolean',
    default: true,
  },
};

/**
 * Produces a random integer between _min_ (inclusive)
 * and _max_ (inclusive), using the `crypto` library
 */
const randomInt = (min, max) => {
  return crypto.randomInt(min, max + 1);
};

/**
 * Takes an array and returns an array with the same elements, but in random order.
 * Uses the Fisher-Yates Sorting Algorithm applied three times.
 */
const shuffleArray = (arr) => {
  let result = [...arr];
  for (let k = 1; k <= 3; k++) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
  }

  return result;
};

const createPool = (
  arrUCases = [],
  arrLCases = [],
  arrDigits = [],
  arrSymbols = []
) => {
  const uCases = shuffleArray(arrUCases);
  const lCases = shuffleArray(arrLCases);
  const digits = shuffleArray(arrDigits);
  const symbols = shuffleArray(arrSymbols);

  let result = [];
  result = shuffleArray(result.concat(uCases, lCases, digits, symbols));

  return result;
};

const defaultParams = {
  quantity: 1,
  length: 10,
  uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  uppercaseOccurrences: 1,
  addUppercases: true,
  lowercases: 'abcdefghijklmnopqrstuvwxyz',
  lowercaseOccurrences: 1,
  addLowercases: true,
  digits: '0123456789',
  digitOccurrences: 1,
  addDigits: true,
  symbols: '£$%&*§#@',
  symbolOccurrences: 1,
  addSymbols: true,
};

const generatePw = (params) => {
  const currentParams = { ...defaultParams, ...params };
  const pool = createPool(
    currentParams.addUppercases ? currentParams.uppercases : [],
    currentParams.addUppercases ? currentParams.lowercases : [],
    currentParams.addDigits ? currentParams.digits : [],
    currentParams.addSymbols ? currentParams.symbols : []
  );
  pool = pool.length > 4 ? pool : ['A', 'b', 1, '@'];
};

console.log(
  '§>',
  (() => {
    let arr = ['alfa', 'beta', 1, 2, 3, 4, 5, 'gamma', 'delta', true, false];
    return shuffleArray(arr);
  })()
);
