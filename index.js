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
 *   uCases: string,
 *   lCases: string,
 *   digits: string,
 *   symbols: string,}} chars an object containing strings
 * @returns {string} a string of shuffled chars
 */
export const createPool = (chars) => {
  const uCases =
    chars.uCases && chars.uCases.length !== 0
      ? shuffleArray(chars.uCases.split('')).join('')
      : '';
  const lCases =
    chars.lCases && chars.lCases.length !== 0
      ? shuffleArray(chars.lCases.split('')).join('')
      : '';
  const digits =
    chars.digits && chars.digits.length !== 0
      ? shuffleArray(chars.digits.split('')).join('')
      : '';
  const symbols =
    chars.symbols && chars.symbols.length !== 0
      ? shuffleArray(chars.symbols.split('')).join('')
      : '';

  let result = uCases + lCases + digits + symbols;

  result = shuffleArray(result.split('')).join('');

  return result;
};

const defaults = {
  quantity: {
    type: 'number',
    min: 1,
    max: 100,
    value: 10,
  },
  length: {
    type: 'number',
    min: 8,
    max: 128,
    value: 12,
  },
  uppercases: {
    type: 'string',
    minLength: '1',
    maxLength: '260',
    value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  uppercaseOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    value: 1,
  },
  addUppercases: {
    type: 'boolean',
    value: true,
  },
  lowercases: {
    type: 'string',
    minLength: '1',
    maxLength: '260',
    value: 'abcdefghijklmnopqrstuvwxyz',
  },
  lowercaseOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    value: 1,
  },
  addLowercases: {
    type: 'boolean',
    value: true,
  },
  digits: {
    type: 'string',
    minLength: '1',
    maxLength: '100',
    value: '0123456789',
  },
  digitOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    value: 1,
  },
  addDigits: {
    type: 'boolean',
    value: true,
  },
  symbols: {
    type: 'string',
    minLength: '1',
    maxLength: '100',
    value: '£$%&*§#@',
  },
  symbolOccurrences: {
    type: 'number',
    min: 1,
    max: 2,
    value: 1,
  },
  addSymbols: {
    type: 'boolean',
    value: true,
  },
};

const defaultParams = {
  quantity: 10,
  length: 12,
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

const consistencyCheck = (obj) => {
  // quantity
  if (obj.quantity && typeof obj.quantity != 'number') {
    throw new Error('The _quantity_ parameter must be of type number');
  }

  if (
    obj.quantity &&
    (obj.quantity < defaults.quantity.min ||
      obj.quantity > defaults.quantity.max)
  ) {
    throw new Error(
      `The quantity of passwords to produce must be between ${defaults.quantity.min} and ${defaults.quantity.max}`,
    );
  }

  // length
  if (obj.length && typeof obj.length != 'number') {
    throw new Error('The _length_ parameter must be of type number');
  }

  if (
    obj.length &&
    (obj.length < defaults.length.min || obj.length > defaults.length.max)
  ) {
    throw new Error(
      `The length of passwords to produce must be between ${defaults.length.min} and ${defaults.length.max}`,
    );
  }

  // uppercases
  if (obj.uppercases && typeof obj.uppercases != 'string') {
    throw new Error('The _uppercases_ parameter must be of type string');
  }

  if (
    obj.uppercases &&
    (obj.uppercases.length < defaults.uppercases.minLength ||
      obj.uppercases.length > defaults.uppercases.maxLength)
  ) {
    throw new Error(
      `the _uppercases_ parameter must contain a minimum of ${defaults.uppercases.minLength} character and a maximum of ${defaults.uppercases.maxLength} characters`,
    );
  }

  // uppercaseOccurrences
  if (obj.uppercaseOccurrences && typeof obj.uppercaseOccurrences != 'number') {
    throw new Error(
      'The _uppercaseOccurrences_ parameter must be of type number',
    );
  }

  if (
    obj.uppercaseOccurrences &&
    (obj.uppercaseOccurrences < defaults.uppercaseOccurrences.min ||
      obj.uppercaseOccurrences > defaults.uppercaseOccurrences.max)
  ) {
    throw new Error(
      `The number of uppercase occurrences must be between ${defaults.uppercaseOccurrences.min} and ${defaults.uppercaseOccurrences.max}`,
    );
  }

  // lowercases
  if (obj.lowercases && typeof obj.lowercases != 'string') {
    throw new Error('The _lowercases_ parameter must be of type string');
  }

  if (
    obj.lowercases &&
    (obj.lowercases.length < defaults.lowercases.minLength ||
      obj.lowercases.length > defaults.lowercases.maxLength)
  ) {
    throw new Error(
      `the _lowercases_ parameter must contain a minimum of ${defaults.lowercases.minLength} character and a maximum of ${defaults.lowercases.maxLength} characters`,
    );
  }

  // lowercasesOccurrences
  if (
    obj.lowercasesOccurrences &&
    typeof obj.lowercasesOccurrences != 'number'
  ) {
    throw new Error(
      'The _lowercasesOccurrences_ parameter must be of type number',
    );
  }

  if (
    obj.lowercasesOccurrences &&
    (obj.lowercasesOccurrences < defaults.lowercasesOccurrences.min ||
      obj.lowercasesOccurrences > defaults.lowercasesOccurrences.max)
  ) {
    throw new Error(
      `The number of lowercase occurrences must be between ${defaults.uppercaseOccurrences.min} and ${defaults.uppercaseOccurrences.max}`,
    );
  }

  // digits
  if (obj.digits && typeof obj.digits != 'string') {
    throw new Error('The _digits_ parameter must be of type string');
  }

  if (
    obj.digits &&
    (obj.digits.length < defaults.digits.minLength ||
      obj.digits.length > defaults.digits.maxLength)
  ) {
    throw new Error(
      `the _digits_ parameter must contain a minimum of ${defaults.digits.minLength} character and a maximum of ${defaults.digits.maxLength} characters`,
    );
  }

  // digitsOccurrences
  if (obj.digitsOccurrences && typeof obj.digitsOccurrences != 'number') {
    throw new Error('The _digitsOccurrences_ parameter must be of type number');
  }

  if (
    obj.digitsOccurrences &&
    (obj.digitsOccurrences < defaults.digitsOccurrences.min ||
      obj.digitsOccurrences > defaults.digitsOccurrences.max)
  ) {
    throw new Error(
      `The number of digits occurrences must be between ${defaults.uppercaseOccurrences.min} and ${defaults.uppercaseOccurrences.max}`,
    );
  }

  // symbols
  if (obj.symbols && typeof obj.symbols != 'string') {
    throw new Error('The _symbols_ parameter must be of type string');
  }

  if (
    obj.symbols &&
    (obj.symbols.length < defaults.symbols.minLength ||
      obj.symbols.length > defaults.symbols.maxLength)
  ) {
    throw new Error(
      `the _symbols_ parameter must contain a minimum of ${defaults.symbols.minLength} character and a maximum of ${defaults.symbols.maxLength} characters`,
    );
  }

  // symbolsOccurrences
  if (obj.symbolsOccurrences && typeof obj.symbolsOccurrences != 'number') {
    throw new Error(
      'The _symbolsOccurrences_ parameter must be of type number',
    );
  }

  if (
    obj.symbolsOccurrences &&
    (obj.symbolsOccurrences < defaults.symbolsOccurrences.min ||
      obj.symbolsOccurrences > defaults.symbolsOccurrences.max)
  ) {
    throw new Error(
      `The number of symbols occurrences must be between ${defaults.uppercaseOccurrences.min} and ${defaults.uppercaseOccurrences.max}`,
    );
  }

  if (
    !obj.addUppercases &&
    !obj.addLowercases &&
    !obj.addDigits &&
    !obj.addSymbols
  ) {
    throw new Error(
      'Empty pool: you must add at least one between uppercase, lowercase, digits or symbols.',
    );
  }
};

/**
 * Takes a string and checks that it contains at
 * least `occurrences` characters among those
 * contained in a given array
 *
 * @param {string} str the password to check
 * @param {number} occurrences How many chars in `str` are contained in `strArr`
 * @param {string[]} strArr the array used to check the password
 * @returns {boolean}
 */
export const checkPassword = (str, occurrences, strArr) => {
  let result = false;
  let stack = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (strArr.includes(char)) {
      stack += char;
    }
  }

  if (stack.length >= occurrences) {
    result = true;
  }

  if ($$debugging) {
    console.log('§> checkPassword', {
      str,
      occurrences,
      strArr,
      stack,
      result,
    });
  }

  return result;
};

/**
 * Takes a password (a string) and checks that it contains
 * at least `occurrences` uppercase character, `occurrences`
 * lowercase character, `occurrences` number and
 * `occurrences` special character.
 *
 * @param {string} str the password to check
 * @returns {boolean} true if the password is valid, false otherwise.
 */
export const isValidPassword = (str) => {
  let result = true;

  if (!checkPassword(str, getUpperCasesOccurrences(), getUpperCases())) {
    result = false;
  }
  if (!checkPassword(str, getLowerCasesOccurrences(), getLowerCases())) {
    result = false;
  }
  if (!checkPassword(str, getNumberOccurrences(), getNumbers())) {
    result = false;
  }
  if (!checkPassword(str, getSymbolOccurrences(), getSymbols())) {
    result = false;
  }

  if ($$debugging) {
    console.log('§> isValidPassword', { str, result });
  }

  return result;
};

/**
 * Creates a password of _length_ length.
 *
 * @param length Length of the password
 * @returns {string} the password
 */
export const getPwd = (length) => {
  let result = '';
  const pool = getPool();

  do {
    result = '';
    for (let i = 1; i <= length; i++) {
      const index = randomInt(0, pool.length - 1);
      result += pool[index];
    }
  } while (!isValidPassword(result));

  result = shuffleArray(result.split('')).join('');

  if ($$debugging) {
    console.log('§> getPwd', { length, pool, result });
  }

  return result;
};

export const generate = (params) => {
  try {
    const currentParams = { ...defaultParams, ...params };
    consistencyCheck(currentParams);
    const pool = createPool({
      uCases: currentParams.uppercases,
      lCases: currentParams.lowercases,
      digits: currentParams.digits,
      symbols: currentParams.symbols,
    });
  } catch (error) {
    console.error(error);
  }
};

generate();
