import { title, test, should, from, end } from './scopeo/scopeo.js';
import * as main from './index.js';

title('pwdgen test suite');

test(
  'Function randomInt()',
  from(1, 100),
  should('return a random integer number => 1 and =< 100'),
  main.randomInt,
);

test(
  'Function shuffleArray()',
  from([
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
  ]),
  should('return a shuffled array'),
  main.shuffleArray,
);

test(
  'Function createPool()',
  from({
    arrLCases: ['a', 'g', 'l', 'w', 'c'],
    arrDigits: [1, 3, 4, 6, 7, 9],
  }),
  should('return an array of shuffled chars'),
  main.createPool,
);

end();
