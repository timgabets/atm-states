import test from 'ava';
import StatesService from '../lib/states.js';

const s = new StatesService();

/**
 * getEntry() test cases
 */

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

/**
 * parseState()
 */
test('should return null if state number is invalid', t => {
  t.is(s.parseState('XYZA870500128002002002001127'), null);
});

test('should parse state A properly', t => {
 let parsed = new Map();
  
  parsed.set('description', 'Card read state');
  parsed.set('number', '000'); 
  parsed.set('type', 'A');
  parsed.set('screen_number', '870');
  parsed.set('good_read_next_state', '500'); 
  parsed.set('error_screen_number', '128');
  parsed.set('read_condition_1', '002');
  parsed.set('read_condition_2', '002');
  parsed.set('read_condition_3', '002');
  parsed.set('card_return_flag', '001');
  parsed.set('no_fit_match_next_state', '127');
  
  t.deepEqual(s.parseState('000A870500128002002002001127'), parsed);
});

 
