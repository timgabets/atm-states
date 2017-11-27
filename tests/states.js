import test from 'ava';
import StatesService from '../lib/states.js';

test('should pass the dummy test', t => {
  t.is(true, true);
});

test('should pass the dummy test', t => {
  let s = new StatesService();
  t.is(s.parseState(), false);
});

