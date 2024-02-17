import { title, test, should } from './td-tests/td-tests.js';
import * as main from './index.js';

title('pwdgen test suite');

test(
  'Function randomInt()',
  should('return a random integer number => 1 and =< 100'),
  () => main.randomInt(1, 100),
);

test(
  'Function shuffleArray()',
  should('return a shuffled array'),
  () => {
    const arr = [
      1,
      'alfa',
      2,
      'beta',
      3,
      'gamma',
      4,
      'gamma',
      5,
      'delta',
      6,
      'epsilon',
      7,
      'zeta',
    ];
    return main.shuffleArray(arr);
  },
);

test(
  'Function createPool()',
  should('return an array of shuffled chars'),
  () => {
    return main.createPool({
      arrLCases: ['a', 'g', 'l', 'w', 'c'],
      arrDigits: [1, 3, 4, 6, 7, 9],
    });
  },
);
