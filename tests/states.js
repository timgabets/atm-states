import test from 'ava';
import StatesService from '../lib/states.js';

const s = new StatesService();

test('should pass the dummy test', t => {
  t.is(true, true);
});

test('should pass the dummy test', t => {
  t.is(s.parseState(), false);
});

test('should get entry 1', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 1), 'A');
});

test('should get entry 2', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 2), 'BCD');
}) ;
    
test('should get entry 3', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 3), 'EFG');
});

test('should get entry 4', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 4), 'HIJ');
});

test('should get entry 5', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 5), 'KLM');
});

test('should get entry 6', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 6), 'NOP');
});

test('should get entry 7', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 7), 'QRS');
});

test('should get entry 8', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 8), 'TUV');
});

test('should get entry 9', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 9), 'WXY');
});

test('should get entry 10', t => {
  t.is(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 10), null);
});
 
