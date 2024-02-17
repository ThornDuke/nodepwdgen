/**
 * pwgen
 * A strong password generator for Node
 *
 * First edit 2024-02-12
 */
'use strict';
import { randomInt as _randomInt } from 'node:crypto';

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
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomInt = (min, max) => {
  return _randomInt(min, max + 1);
};

/**
 * Takes an array and returns an array with the same elements, but in random order.
 * Uses the Fisher-Yates Sorting Algorithm applied three times.
 *
 * @param {Array} arr
 * @returns {Array}
 */
export const shuffleArray = (arr) => {
  let result = [...arr];
  for (let k = 1; k <= 3; k++) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
  }

  return result;
};

/**
 * Takes an object and return an array of shufflerd chars
 *
 * @param {{
 *   arrUCases: string[],
 *   arrLCases: string[],
 *   arrDigits: string[],
 *   arrSymbols: string[],}} charArrays an object containing arrays of chars
 * @returns {string[]} an array of shuffled chars
 */
export const createPool = (charArrays) => {
  const uCases =
    charArrays.arrLCases && charArrays.arrLCases.length !== 0
      ? shuffleArray(charArrays.arrLCases)
      : [];
  const lCases =
    charArrays.arrLCases && charArrays.arrLCases.length !== 0
      ? shuffleArray(charArrays.arrLCases)
      : [];
  const digits =
    charArrays.arrDigits && charArrays.arrDigits.length !== 0
      ? shuffleArray(charArrays.arrDigits)
      : [];
  const symbols =
    charArrays.arrSymbols && charArrays.arrSymbols.length !== 0
      ? shuffleArray(charArrays.arrSymbols)
      : [];

  let result = [];
  result = shuffleArray(
    result.concat(uCases, lCases, digits, symbols),
  );

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
    currentParams.addSymbols ? currentParams.symbols : [],
  );
  pool = pool.length > 4 ? pool : ['A', 'b', 1, '@'];
};
