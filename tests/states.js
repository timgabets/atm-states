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

test('should parse state C properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Envelope Dispenser state');
  parsed.set('number', '634');
  parsed.set('type', 'C');
  parsed.set('next_state', '631');
  parsed.set('states_to', [ '631' ]);
      
  t.deepEqual(s.parseState('634C631791092174618362840503'), parsed);
});

test('should parse state D properly', t => {
  let parsed = new Map();

  parsed.set('description','PreSet Operation Code Buffer');
  parsed.set('number', '003');
  parsed.set('type', 'D');
  parsed.set('next_state', '024');
  parsed.set('clear_mask', '000');
  parsed.set('A_preset_mask', '128');
  parsed.set('B_preset_mask', '001');
  parsed.set('C_preset_mask', '002');
  parsed.set('D_preset_mask', '003');
  parsed.set('extension_state', '005');
  parsed.set('states_to', [ '024' ]);

  t.deepEqual(s.parseState('003D024000128001002003004005'), parsed);
});

test('should parse state E properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Four FDK selection state');
  parsed.set('number', '141');
  parsed.set('type', 'E');
  parsed.set('screen_number', '141');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '255');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '571');
  parsed.set('FDK_D_next_state', '132');
  parsed.set('buffer_location', '000');
  parsed.set('states_to', [ '002', '131', '255', '255', '571', '132' ]);

  t.deepEqual(s.parseState('141E141002131255255571132000'), parsed);    
});

test('should parse state F properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Amount entry state');
  parsed.set('number', '219');
  parsed.set('type', 'F');
  parsed.set('screen_number', '069');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '220');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '220');
  parsed.set('FDK_D_next_state', '219');
  parsed.set('amount_display_screen', '006');
  parsed.set('states_to', [ '002', '131', '220', '255', '220', '219' ]);
  
  t.deepEqual(s.parseState('219F069002131220255220219006'), parsed);    
});

test('should parse state G properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Amount check state');
  parsed.set('number', '073');
  parsed.set('type', 'G');
  parsed.set('amount_check_condition_true', '074');
  parsed.set('amount_check_condition_false', '07T');
  parsed.set('buffer_to_check', 'YUG');
  parsed.set('integer_multiple_value', 'HJV');
  parsed.set('decimal_places', 'BN3');
  parsed.set('currency_type', 'QWE');
  parsed.set('amount_check_condition', 'ASD');
  parsed.set('states_to', [ '074', '07T' ]);
  t.deepEqual(s.parseState('073G07407TYUGHJVBN3QWEASDZXC'), parsed);    
});

test('should parse state H properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Information Entry State');
  parsed.set('number', '089');
  parsed.set('type', 'H');
  parsed.set('screen_number', '564');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '090');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '090');
  parsed.set('FDK_D_next_state', '089');
  parsed.set('buffer_and_display_params', '003');
  parsed.set('states_to', [ '002', '131', '090', '255', '090', '089' ]);

  t.deepEqual(s.parseState('089H564002131090255090089003'), parsed);    
});


