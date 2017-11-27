import test from 'ava';
import StatesService from '../lib/states.js';

const s = new StatesService();

/**
 * getEntry() test cases
 */

test('should get entry 1', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 1), 'A');
});

test('should get entry 2', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 2), 'BCD');
}) ;
    
test('should get entry 3', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 3), 'EFG');
});

test('should get entry 4', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 4), 'HIJ');
});

test('should get entry 5', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 5), 'KLM');
});

test('should get entry 6', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 6), 'NOP');
});

test('should get entry 7', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 7), 'QRS');
});

test('should get entry 8', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 8), 'TUV');
});

test('should get entry 9', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 9), 'WXY');
});

test('should get entry 10', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 10), null);
});

/**
 * parseState()
 */
test('should return null if state number is invalid', t => {
  t.deepEqual(s.parseState('XYZA870500128002002002001127'), null);
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
  parsed.set('states_to', ['500', '127']);
  
  t.deepEqual(s.parseState('000A870500128002002002001127'), parsed);
});

test('should parse state B properly', t => {
  let parsed = new Map();
  
  parsed.set('description', 'PIN Entry state');
  parsed.set('number', '024');
  parsed.set('type', 'B');
  parsed.set('screen_number', '024');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('local_pin_check_good_next_state', '026');
  parsed.set('local_pin_check_max_bad_pins_next_state', '026');
  parsed.set('local_pin_check_error_screen', '138');
  parsed.set('remote_pin_check_next_state', '026');
  parsed.set('local_pin_check_max_retries', '003');
  parsed.set('states_to', [ '002', '131', '026', '026', '026' ]);

  t.deepEqual(s.parseState('024B024002131026026138026003'), parsed);
});

test('should parse state b properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Customer selectable PIN state');
  parsed.set('number', '230');
  parsed.set('type', 'b');
  parsed.set('first_entry_screen_number', '063');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('good_read_next_state', '232');
  parsed.set('csp_fail_next_state', '000');
  parsed.set('second_entry_screen_number', '064');
  parsed.set('mismatch_first_entry_screen_number', '065');
  parsed.set('extension_state', '231');
  parsed.set('states_to', [ '002', '131', '232', '000' ]);

  t.deepEqual(s.parseState('230b063002131232000064065231'), parsed);
});


