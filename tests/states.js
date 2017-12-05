import test from 'ava';
import StatesService from '../lib/states.js';

const pkgjson = require('../package.json');
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

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);
  
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

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('026');
  parsed.set('states_to', states_to);  

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

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('232');
  states_to.add('000');
  parsed.set('states_to', states_to);  

  t.deepEqual(s.parseState('230b063002131232000064065231'), parsed);
});

test('should parse state C properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Envelope Dispenser state');
  parsed.set('number', '634');
  parsed.set('type', 'C');
  parsed.set('next_state', '631');

  let states_to = new Set();
  states_to.add('631');
  parsed.set('states_to', states_to);
      
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
  
  let states_to = new Set();
  states_to.add('024');
  parsed.set('states_to', states_to);

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

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('571');
  states_to.add('132');
  parsed.set('states_to', states_to);

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

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('220');
  states_to.add('219');
  parsed.set('states_to', states_to);
  
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

  let states_to = new Set();
  states_to.add('074');
  states_to.add('07T');
  parsed.set('states_to', states_to);

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

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('090');
  states_to.add('089');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('089H564002131090255090089003'), parsed);    
});

test('should parse state I properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Transaction request state');
  parsed.set('number', '027');
  parsed.set('type', 'I');
  parsed.set('screen_number', '025');
  parsed.set('timeout_next_state', '146');
  parsed.set('send_track2', '001');
  parsed.set('send_track1_track3', '000');
  parsed.set('send_operation_code', '001');
  parsed.set('send_amount_data', '001');
  parsed.set('send_pin_buffer', '001');
  parsed.set('send_buffer_B_buffer_C', '003');
  
  let states_to = new Set();
  states_to.add('146');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('027I025146001000001001001003'), parsed);        
});

test('should parse state J properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Close state');
  parsed.set('number', '002');
  parsed.set('type', 'J');
  parsed.set('receipt_delivered_screen', '132');
  parsed.set('next_state', '000');
  parsed.set('no_receipt_delivered_screen', '132');
  parsed.set('card_retained_screen_number', '136');
  parsed.set('statement_delivered_screen_number', '132');
  parsed.set('bna_notes_returned_screen', '081');
  parsed.set('extension_state', '178');

  t.deepEqual(s.parseState('002J132000132136132000081178'), parsed);        
});

test('should parse state k properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Smart FIT check state');
  parsed.set('number', '515');
  parsed.set('type', 'k');
  parsed.set('good_read_next_state', '001');
  parsed.set('card_return_flag', '001');
  parsed.set('no_fit_match_next_state', '127');

  let states_to = new Set();
  states_to.add('001');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('515k000001000000000000001127'), parsed);        
});

test('should parse state K properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FIT Switch state');
  parsed.set('number', '001');
  parsed.set('type', 'K');

  let states_to = new Set();
  states_to.add('003');
  states_to.add('004');
  states_to.add('127');

  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('001K003004004127127127127127'), parsed);        
});

test('should parse state m properly', t => {
  let parsed = new Map();

  parsed.set('description', 'PIN & Language Select State');
  parsed.set('number', '172');
  parsed.set('type', 'm');
  parsed.set('screen_number', '138');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('next_state_options_extension_state', '173');
  parsed.set('operation_codes_extension_state', '255');
  parsed.set('buffer_positions', '255');
  parsed.set('FDK_active_mask', '570');
  parsed.set('multi_language_screens_extension_state', '255');

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('172m138002131173255255570255'), parsed);        
});

test('should parse state U properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Device Fitness Flow Select State');
  parsed.set('number', '189');
  parsed.set('type', 'U');
  parsed.set('device_number', '035');
  parsed.set('device_available_next_state', '190');
  parsed.set('device_identifier_grafic', '113');
  parsed.set('device_unavailable_next_state', '201');
  parsed.set('device_subcomponent_identifier', '00q');

  let states_to = new Set();
  states_to.add('190');
  states_to.add('201');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('189U03519011320100q000000000'), parsed);        
});

test('should parse state W properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FDK Switch state');
  parsed.set('number', '035');
  parsed.set('type', 'W');
  parsed.set('states', { 
    A: '181', 
    B: '037', 
    C: '255', 
    D: '127', 
    F: '031', 
    G: '034', 
    H: '250', 
    I: '186' 
  });
  parsed.set('states_to', [ '181', '037', '255', '127', '031', '034', '250', '186' ]);

  t.deepEqual(s.parseState('035W181037255127031034250186'), parsed);        
});

test('should parse state X properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FDK information entry state');
  parsed.set('number', '037');
  parsed.set('type', 'X');
  parsed.set('screen_number', '037');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_next_state', '038');
  parsed.set('extension_state', '039');
  parsed.set('buffer_id', '010');
  parsed.set('FDK_active_mask', '255');

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('038');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('037X037002131038039010255000'), parsed);        
});

test('should parse state Y properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Eight FDK selection state');
  parsed.set('number', '011');
  parsed.set('type', 'Y');
  parsed.set('screen_number', '023');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_next_state', '012');
  parsed.set('extension_state', '255');
  parsed.set('buffer_positions', '004');
  parsed.set('FDK_active_mask', '052');
  parsed.set('multi_language_screens', '013');

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('012');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('011Y023002131012255004052013'), parsed);        
});

test('should parse state Z properly', t => {
  let parsed = new Map();
        
  parsed.set('description', 'Extension state');
  parsed.set('number', '037');
  parsed.set('type', 'Z');
  parsed.set('entries', [ null, 'Z', '123', '456', '789', '0AB', 'CDE', 'FGH', 'IJK', 'LMN' ]); 
  
  t.deepEqual(s.parseState('037Z1234567890ABCDEFGHIJKLMN'), parsed);        
});

test('should parse state > properly', t => {
  let parsed = new Map();
       
  parsed.set('description', 'Cash deposit state');
  parsed.set('number', '037');
  parsed.set('type', '>');
  parsed.set('cancel_key_mask', '701');
  parsed.set('deposit_key_mask', '928');
  parsed.set('add_more_key_mask', '362');
  parsed.set('refund_key_mask', '810');
  parsed.set('extension_state_1', '280');
  parsed.set('extension_state_2', '293');
  parsed.set('extension_state_3', '751' );

  t.deepEqual(s.parseState('037>701928362810280293751745'), parsed);        
});

test('should parse state / properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Complete ICC selection');
  parsed.set('number', '299');
  parsed.set('type', '/');
  parsed.set('please_wait_screen_number', '025');
  parsed.set('icc_app_name_template_screen_number', '860');
  parsed.set('icc_app_name_screen_number', '861');
  parsed.set('extension_state', '300');

  t.deepEqual(s.parseState('299/025860861300000000000000'), parsed);        
});

test('should parse state ? properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Set ICC transaction data');
  parsed.set('number', '301');
  parsed.set('type', '?');
  parsed.set('next_state', '560');
  parsed.set('currency_type', '001');
  parsed.set('transaction_type', '001');
  parsed.set('amount_authorized_source', '031');
  parsed.set('amount_other_source', '040');
  parsed.set('amount_too_large_next_state', '000');

  let states_to = new Set();
  states_to.add('560');
  states_to.add('000');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('301?560001001031040000000000'), parsed);        
});

test('should parse state z properly', t => {
  let parsed = new Map();

  parsed.set('description', 'EMV ICC Application Switch state');
  parsed.set('number', '462');
  parsed.set('type', 'z');
  parsed.set('next_state', '001');
  parsed.set('terminal_aid_extension_1', '000');
  parsed.set('next_state_extension_1', '000');
  parsed.set('terminal_aid_extension_2', '019');
  parsed.set('next_state_extension_2', '463');
  parsed.set('terminal_aid_extension_3', '464');
  parsed.set('next_state_extension_3', '465');

  t.deepEqual(s.parseState('462z001000000019463464465000'), parsed);        
});

test('should parse state + properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Begin ICC Initialization state');
  parsed.set('number', '500');
  parsed.set('type', '+');
  parsed.set('icc_init_started_next_state', '501');
  parsed.set('icc_init_not_started_next_state', '001');
  parsed.set('icc_init_requirement', '001');
  parsed.set('automatic_icc_app_selection_flag', '000');
  parsed.set('default_app_label_usage_flag', '000');
  parsed.set('cardholder_confirmation_flag', '000');

  let states_to = new Set();
  states_to.add('501');
  states_to.add('001');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('500+501001001000000000000000'), parsed);        
});

test('should parse state , properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Complete ICC Initialization state');
  parsed.set('number', '501');
  parsed.set('type', ',');
  parsed.set('please_wait_screen_number', '000');
  parsed.set('icc_init_success', '502');
  parsed.set('card_not_smart_next_state', '001');
  parsed.set('no_usable_applications_next_state', '001');
  parsed.set('icc_app_level_error_next_state', '001');
  parsed.set('icc_hardware_level_error_next_state', '001');
  parsed.set('no_usable_applications_fallback_next_state', '167');

  let states_to = new Set();
  states_to.add('502');
  states_to.add('001');
  states_to.add('167');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('501,000502001001001001167000'), parsed);        
});

test('should parse state - properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Automatic Language Selection state');
  parsed.set('number', '502');
  parsed.set('type', '-');
  parsed.set('language_match_next_state', '505');
  parsed.set('no_language_match_next_state', '503');

  let states_to = new Set();
  states_to.add('505');
  states_to.add('503');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('502-505503000000000000000000'), parsed);        
});

test('should parse state . properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Begin ICC Application Selection & Initialization state');
  parsed.set('number', '505');
  parsed.set('type', '.');
  parsed.set('cardholder_selection_screen_number', '039');
  parsed.set('FDK_template_screen_numbers_extension_state', '510');
  parsed.set('action_keys_extension_state_number', '511');
  parsed.set('exit_paths_extension_state_number', '512');
  parsed.set('single_app_cardholder_selection_screen_number', '000');

  t.deepEqual(s.parseState('505.039510511512000000000000'), parsed);        
});

test('should parse state ; properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'ICC Re-initialize state');
  parsed.set('number', '569');
  parsed.set('type', ';');
  parsed.set('good_read_next_state', '026');
  parsed.set('processing_not_performed_next_state', '026');
  parsed.set('reinit_method', '000');
  parsed.set('chip_power_control', '000');
  parsed.set('reset_terminal_pobjects', '000');

  let states_to = new Set();
  states_to.add('026');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('569;026026000000000000000000'), parsed);        
});

test('should parse state & properly', t => {
  let parsed = new Map();
   
  parsed.set('description', 'Barcode Read State');
  parsed.set('number', '109');
  parsed.set('type', '&');
  parsed.set('screen_number', '276');
  parsed.set('good_read_next_state', '085');
  parsed.set('cancel_next_state', '131');
  parsed.set('error_next_state', '131');
  parsed.set('timeout_next_state', '002');

  let states_to = new Set();
  states_to.add('085');
  states_to.add('131');
  states_to.add('002');
  parsed.set('states_to', states_to);

  t.deepEqual(s.parseState('109&276085131131002004255000'), parsed);        
});

test('should throw error if state data is invalid', t => {
  t.deepEqual(s.parseState('000~8'), null);
});

/**
 * addStateArray() test cases
 */

test('should add valid state passed as array object', t => {
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

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);

  t.deepEqual(s.addStateArray(['000', 'A', '870', '500', '128', '002', '002', '002', '001', '127']), true);
  t.deepEqual(s.get('000'), parsed);
});

test('should add valid state passed as array object with unpadded values', t => {
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
  parsed.set('card_return_flag', '021');
  parsed.set('no_fit_match_next_state', '127');

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);

  t.deepEqual(s.addStateArray(['0', 'A', '870', '500', '128', '2', '2', '2', '21', '127']), true);
  t.deepEqual(s.get('000'), parsed);
});

test('should not add state with the incorrect state entries', t => {
  t.deepEqual(s.addStateArray(['0', 'A', '870', '500', '128', '2', '', '0', '21', '9999999999']), false);
});

test('should not add state with the incorrect state type', t => {
  t.deepEqual(s.addStateArray(['0', 'AX', '870', '500', '128', '2', '2', '0', '21', '000']), false);
});

test('should not add state with the empty state type', t => {
  t.deepEqual(s.addStateArray(['0', '', '870', '500', '128', '2', '2', '0', '21', '000']), false);
});

test('should add valid state passed as array of numbers', t => {
  let parsed = new Map();

  parsed.set('description', 'Close state');
  parsed.set('number', '002');
  parsed.set('type', 'J');
  parsed.set('receipt_delivered_screen', '132');
  parsed.set('next_state', '000');
  parsed.set('no_receipt_delivered_screen', '132');
  parsed.set('card_retained_screen_number', '136');
  parsed.set('statement_delivered_screen_number', '132');
  parsed.set('bna_notes_returned_screen', '120');
  parsed.set('extension_state', '264' );

  t.deepEqual(s.addStateArray([2, 'J', 132, 0, 132, 136, 132, 0, 120, 264, 0]), true);
  t.deepEqual(s.get('002'), parsed);
});

/**
 * addState() test cases
 */

test('should return false when empty data passed', t => {
  t.is(s.addState(), false);
});

test('should return false when empty string passed', t => {
  t.is(s.addState(''), false);
});

test('should overwrite previous state data', t => {
  t.is(s.addState('000X444444444444444444444444'), true);
  t.is(s.addState('000Y555555555555555555555555'), true);
  t.is(s.addState('000Z666666666666666666666666'), true);
  
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

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);

  t.is(s.addState('000A870500128002002002001127'), true);
  t.deepEqual(s.get('000'), parsed);
});


test('should add valid state passed as string', t => {
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

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);

  t.is(s.addState('000A870500128002002002001127'), true);
  t.deepEqual(s.get('000'), parsed);
});

test('should add valid state passed as array of numbers', t => {
  let parsed = new Map();
  
  parsed.set('description', 'Close state');
  parsed.set('number', '002');
  parsed.set('type', 'J');
  parsed.set('receipt_delivered_screen', '132');
  parsed.set('next_state', '000');
  parsed.set('no_receipt_delivered_screen', '132');
  parsed.set('card_retained_screen_number', '136');
  parsed.set('statement_delivered_screen_number', '132');
  parsed.set('bna_notes_returned_screen', '120');
  parsed.set('extension_state', '264' );

  t.is(s.addState([2, 'J', 132, 0, 132, 136, 132, 0, 120, 264, 0]), true);
  t.deepEqual(s.get('002'), parsed);
});

/**
 * add()
 */
test('should add states passed as array', t => {
  let states = ['000A870500128002002002001127', '001K003004004127127127127127', '002J132000132136132000081178', '003D024000128000000000000000', '004D024000000128000000000000'];
  t.is(s.add(states), true);
});

test('should add single state passed as a string', t => {
  let state = '000A870500128002002002001127';
  t.is(s.add(state), true);
});

test('should return false if one of the states is invalid', t => {
  let states = ['xyzAxyz500128002002002001127', '004D024000000128000000000000'];
  t.is(s.add(states), false);
});
 
/**
 * getNodes()
 */

test('should return single state node', t => {
  const n = new StatesService();

  let state = '000A870500128002002002001127';
  t.is(n.addState(state), true);

  let nodes = [{'id': '000', 'label': '000 A', 'level': 1}];
  t.deepEqual(n.getNodes(), nodes);
});

test('should return multiple state nodes', t => {
  const n = new StatesService();
  
  let states = ['000A870500128002002002001127', '500K003004004127127127127127'];
  t.is(n.add(states), true);
      
  let nodes = [
    { 'id': '500', 'label': '500 K', 'level': 2 },
    { 'id': '000', 'label': '000 A', 'level': 1 }, 
  ];
  t.deepEqual(n.getNodes(), nodes);
});

/**
 * setStateLevels()
 */
test('should set state levels', t => {
  let n = new StatesService();
  
  let states = ['000A870500128002002002001127', '001K003004004127127127127127', '002J132000132136132000081178', '003D024000128000000000000000', '004D024000000128000000000000'];
  t.is(n.add(states), true);

  n.setStateLevels(['000', '001', '002'], 14);

  t.is(n.states['000'].get('level'), 14);  
  t.is(n.states['001'].get('level'), 14);  
  t.is(n.states['002'].get('level'), 14);  
});
 
/**
 * clearStateLevels()
 */

test('should clear state levels', t => {
  let n = new StatesService();

  let states = ['000A870500128002002002001127', '001K003004004127127127127127', '002J132000132136132000081178', '003D024000128000000000000000', '004D024000000128000000000000'];
  t.is(n.add(states), true);

  n.setStateLevels(['000', '001', '002'], 22);

  t.is(n.states['000'].get('level'), 22);  
  t.is(n.states['001'].get('level'), 22);  
  t.is(n.states['002'].get('level'), 22);  

  n.clearStateLevels();

  t.is(n.states['000'].get('level'), null );
  t.is(n.states['001'].get('level'), null );
});


/**
 * updateStateLevels()
 */
test('should update state levels with depth 1', t => {
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

  let states_to = new Set();
  states_to.add('500');
  states_to.add('127');
  parsed.set('states_to', states_to);

  t.is(s.addState('000A870500128002002002001127'), true);
  t.deepEqual(s.get('000'), parsed);

  t.is(s.addState('500Zxxxxxxxxxxxxxxxxxxxxxxxx'), true);
  t.is(s.addState('127Zxxxxxxxxxxxxxxxxxxxxxxxx'), true);
  s.updateStateLevels();

  t.is(s.get('000').get('level'), 1);
  t.is(s.get('500').get('level'), 2);
  t.is(s.get('127').get('level'), 2);
});

test('should update state levels with depth 2', t => {
  // Level 0
  let A000 = new Map();

  A000.set('description', 'Card read state');
  A000.set('number', '000');
  A000.set('type', 'A');
  A000.set('screen_number', '870');
  A000.set('good_read_next_state', '500');
  A000.set('error_screen_number', '128');
  A000.set('read_condition_1', '002');
  A000.set('read_condition_2', '002');
  A000.set('read_condition_3', '002');
  A000.set('card_return_flag', '001');
  A000.set('no_fit_match_next_state', '127');

  let A000_states_to = new Set();
  A000_states_to.add('500');
  A000_states_to.add('127');
  A000.set('states_to', A000_states_to);

  t.is(s.addState('000A870500128002002002001127'), true);
  t.deepEqual(s.get('000'), A000);

  // Level 1
  let B500 = new Map();

  B500.set('description', 'PIN Entry state');
  B500.set('number', '500');
  B500.set('type', 'B');
  B500.set('screen_number', '024');
  B500.set('timeout_next_state', '002');
  B500.set('cancel_next_state', '131');
  B500.set('local_pin_check_good_next_state', '026');
  B500.set('local_pin_check_max_bad_pins_next_state', '026');
  B500.set('local_pin_check_error_screen', '138');
  B500.set('remote_pin_check_next_state', '026');
  B500.set('local_pin_check_max_retries', '003');

  let B500_states_to = new Set();
  B500_states_to.add('002');
  B500_states_to.add('131');
  B500_states_to.add('026');
  B500.set('states_to', B500_states_to);

  t.is(s.addState('500B024002131026026138026003'), true);
  t.deepEqual(s.get('500'), B500);

  let D127 = new Map();

  D127.set('description','PreSet Operation Code Buffer');
  D127.set('number', '127');
  D127.set('type', 'D');
  D127.set('next_state', '024');
  D127.set('clear_mask', '000');
  D127.set('A_preset_mask', '128');
  D127.set('B_preset_mask', '001');
  D127.set('C_preset_mask', '002');
  D127.set('D_preset_mask', '003');
  D127.set('extension_state', '005');

  let D127_states_to = new Set();
  D127_states_to.add('024');
  D127.set('states_to', D127_states_to);

  t.is(s.addState('127D024000128001002003004005'), true);
  t.deepEqual(s.get('127'), D127);

  // Level 2
  let J002 = new Map();
        
  J002.set('description',  'Close state');
  J002.set('number',  '002');
  J002.set('type',  'J');
  J002.set('receipt_delivered_screen',  '132');
  J002.set('next_state',  '000');
  J002.set('no_receipt_delivered_screen',  '132');
  J002.set('card_retained_screen_number',  '136');
  J002.set('statement_delivered_screen_number',  '132');
  J002.set('bna_notes_returned_screen',  '081');
  J002.set('extension_state',  '178');

  t.is(s.addState('002J132000132136132000081178'), true);
  t.deepEqual(s.get('002'), J002);

  let J131 = new Map();

  J131.set('description', 'Close state');
  J131.set('number', '131');
  J131.set('type', 'J');
  J131.set('receipt_delivered_screen', '132');
  J131.set('next_state', '000');
  J131.set('no_receipt_delivered_screen', '132');
  J131.set('card_retained_screen_number', '136');
  J131.set('statement_delivered_screen_number', '132');
  J131.set('bna_notes_returned_screen', '081');
  J131.set('extension_state', '178');

  t.is(s.addState('131J132000132136132000081178'), true);
  t.deepEqual(s.get('131'), J131);

  let J026 = new Map();

  J026.set('description', 'Close state');
  J026.set('number', '026');
  J026.set('type', 'J');
  J026.set('receipt_delivered_screen', '132');
  J026.set('next_state', '000');
  J026.set('no_receipt_delivered_screen', '132');
  J026.set('card_retained_screen_number', '136');
  J026.set('statement_delivered_screen_number', '132');
  J026.set('bna_notes_returned_screen', '081');
  J026.set('extension_state', '178');

  t.is(s.addState('026J132000132136132000081178'), true);
  t.deepEqual(s.get('026'), J026);

  // Updating levels
  s.updateStateLevels();

  t.is(s.get('000').get('level'), 1);
  t.is(s.get('500').get('level'), 2);
  t.is(s.get('127').get('level'), 2);
  t.is(s.get('002').get('level'), 3);
  t.is(s.get('131').get('level'), 3);
  t.is(s.get('026').get('level'), 3);
});

test('should not change level if states_to contains the state itself', t => {
  // Level 0
  let A000 = new Map();

  A000.set('description', 'Card read state');
  A000.set('number', '000');
  A000.set('type', 'A');
  A000.set('screen_number', '870');
  A000.set('good_read_next_state', '219');
  A000.set('error_screen_number', '128');
  A000.set('read_condition_1', '002');
  A000.set('read_condition_2', '002');
  A000.set('read_condition_3', '002');
  A000.set('card_return_flag', '001');
  A000.set('no_fit_match_next_state', '127');

  let A000_states_to = new Set();
  A000_states_to.add('219');
  A000_states_to.add('127');
  A000.set('states_to', A000_states_to);

  t.is(s.addState('000A870219128002002002001127'), true);
  t.deepEqual(s.get('000'), A000);

  let F219 = new Map();

  F219.set('description', 'Amount entry state');
  F219.set('number', '219');
  F219.set('type', 'F');
  F219.set('screen_number', '069');
  F219.set('timeout_next_state', '002');
  F219.set('cancel_next_state', '131');
  F219.set('FDK_A_next_state', '220');
  F219.set('FDK_B_next_state', '255');
  F219.set('FDK_C_next_state', '220');
  F219.set('FDK_D_next_state', '219');
  F219.set('amount_display_screen', '006');

  let F219_states_to = new Set();
  F219_states_to.add('002');
  F219_states_to.add('131');
  F219_states_to.add('220');
  F219_states_to.add('219');
  F219.set('states_to', F219_states_to);

  t.is(s.addState('219F069002131220255220219006'), true);   
  t.deepEqual(s.get('219'), F219);

  s.updateStateLevels();
  t.is(s.get('000').get('level'), 1);
  t.is(s.get('219').get('level'), 2);
});

/**
 * delete()
 */
test('should return false if state does not exist', t => {
  let n = new StatesService();

  t.is(n.delete('219'), false);
});

test('should delete state', t => {
  let n = new StatesService();

  t.is(n.addState('219F069002131220255220219006'), true);    
  t.is(n.delete('219'), true);
  t.is(n.get('219'), undefined);
});
 
/**
 * getEdges()
 */
test('should return empty edges when there is no states', t => {
  let n = new StatesService();

  let edges = [];
  t.deepEqual(n.getEdges(), edges);
});

test('should return edges when single state added', t => {
  let n = new StatesService();

  let edges = [
    {'from': '000', 'to': '500'},
    {'from': '000', 'to': '127'}
  ];
  
  t.is(n.addState('000A870500128002002002001127'), true);    
      
  t.deepEqual(n.getEdges(), edges);
});

test('should return edges when added multiple states', t => {
  let n = new StatesService();

  let edges = [ 
    { from: '000', to: '500' },
    { from: '000', to: '127' },
    { from: '001', to: '003' },
    { from: '001', to: '004' },
    { from: '001', to: '127' } 
  ];

  let states = ['000A870500128002002002001127', '001K003004004127127127127127'];
      
  t.is(n.add(states), true);
  t.deepEqual(n.getEdges(), edges);
});

test('should convert Map state to Object state', t => {
  const n = new StatesService();

  let map = new Map();

  map.set('description', 'Amount entry state');
  map.set('number', '219');
  map.set('type', 'F');
  map.set('screen_number', '069');
  map.set('timeout_next_state', '002');
  map.set('cancel_next_state', '131');
  map.set('FDK_A_next_state', '220');
  map.set('FDK_B_next_state', '255');
  map.set('FDK_C_next_state', '220');
  map.set('FDK_D_next_state', '219');
  map.set('amount_display_screen', '006');

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('220');
  states_to.add('255');
  states_to.add('219');
  map.set('states_to', states_to);

  let object = {
    'description': 'Amount entry state',
    'number': '219',
    'type': 'F',
    'screen_number': '069',
    'timeout_next_state': '002',
    'cancel_next_state': '131',
    'FDK_A_next_state': '220',
    'FDK_B_next_state': '255',
    'FDK_C_next_state': '220',
    'FDK_D_next_state': '219',
    'amount_display_screen': '006',
    'states_to': [ '002', '131', '220', '255', '219' ]
  };

  t.deepEqual(n.convertMapToObject(map), object);
});

test('should convert Object state to Map state', t => {
  const n = new StatesService();

  let map = new Map();

  map.set('description', 'Amount entry state');
  map.set('number', '219');
  map.set('type', 'F');
  map.set('screen_number', '069');
  map.set('timeout_next_state', '002');
  map.set('cancel_next_state', '131');
  map.set('FDK_A_next_state', '220');
  map.set('FDK_B_next_state', '255');
  map.set('FDK_C_next_state', '220');
  map.set('FDK_D_next_state', '219');
  map.set('amount_display_screen', '006');

  let states_to = new Set();
  states_to.add('002');
  states_to.add('131');
  states_to.add('220');
  states_to.add('255');
  states_to.add('219');
  map.set('states_to', states_to);

  let object = {
    'description': 'Amount entry state',
    'number': '219',
    'type': 'F',
    'screen_number': '069',
    'timeout_next_state': '002',
    'cancel_next_state': '131',
    'FDK_A_next_state': '220',
    'FDK_B_next_state': '255',
    'FDK_C_next_state': '220',
    'FDK_D_next_state': '219',
    'amount_display_screen': '006',
    'states_to': [ '002', '131', '220', '255', '220', '219' ]
  };

  t.deepEqual(n.convertObjectToMap(object), map);
});

test('should restore states from settings', t => {
  const n = new StatesService();

  let B500 = new Map();

  B500.set('description', 'PIN Entry state');
  B500.set('number', '500');
  B500.set('type', 'B');
  B500.set('screen_number', '024');
  B500.set('timeout_next_state', '002');
  B500.set('cancel_next_state', '131');
  B500.set('local_pin_check_good_next_state', '026');
  B500.set('local_pin_check_max_bad_pins_next_state', '026');
  B500.set('local_pin_check_error_screen', '138');
  B500.set('remote_pin_check_next_state', '026');
  B500.set('local_pin_check_max_retries', '003');

  let B500_states_to = new Set();
  B500_states_to.add('002');
  B500_states_to.add('131');
  B500_states_to.add('026');
  B500.set('states_to', B500_states_to);

  let D127 = new Map();

  D127.set('description','PreSet Operation Code Buffer');
  D127.set('number', '127');
  D127.set('type', 'D');
  D127.set('next_state', '024');
  D127.set('clear_mask', '000');
  D127.set('A_preset_mask', '128');
  D127.set('B_preset_mask', '001');
  D127.set('C_preset_mask', '002');
  D127.set('D_preset_mask', '003');
  D127.set('extension_state', '005');

  let D127_states_to = new Set();
  D127_states_to.add('024');
  D127.set('states_to', D127_states_to);

  let J002 = new Map();
        
  J002.set('description',  'Close state');
  J002.set('number',  '002');
  J002.set('type',  'J');
  J002.set('receipt_delivered_screen',  '132');
  J002.set('next_state',  '000');
  J002.set('no_receipt_delivered_screen',  '132');
  J002.set('card_retained_screen_number',  '136');
  J002.set('statement_delivered_screen_number',  '132');
  J002.set('bna_notes_returned_screen',  '081');
  J002.set('extension_state',  '178');

  let states = {};
  [B500, D127, J002].forEach((element, index) => {
    states[element.get('number')] = element;
  });

  let states_from_settings = {};
  [B500, D127, J002].forEach((element, index) => {
    states_from_settings[element.get('number')] = n.convertMapToObject(element);
  });

  t.deepEqual(n.restoreStates(states_from_settings), states);
});

test('should prepare states to be saved to settings', t => {
  const n = new StatesService();

  let B500 = new Map();

  B500.set('description', 'PIN Entry state');
  B500.set('number', '500');
  B500.set('type', 'B');
  B500.set('screen_number', '024');
  B500.set('timeout_next_state', '002');
  B500.set('cancel_next_state', '131');
  B500.set('local_pin_check_good_next_state', '026');
  B500.set('local_pin_check_max_bad_pins_next_state', '026');
  B500.set('local_pin_check_error_screen', '138');
  B500.set('remote_pin_check_next_state', '026');
  B500.set('local_pin_check_max_retries', '003');

  let B500_states_to = new Set();
  B500_states_to.add('002');
  B500_states_to.add('131');
  B500_states_to.add('026');
  B500.set('states_to', B500_states_to);

  let D127 = new Map();

  D127.set('description','PreSet Operation Code Buffer');
  D127.set('number', '127');
  D127.set('type', 'D');
  D127.set('next_state', '024');
  D127.set('clear_mask', '000');
  D127.set('A_preset_mask', '128');
  D127.set('B_preset_mask', '001');
  D127.set('C_preset_mask', '002');
  D127.set('D_preset_mask', '003');
  D127.set('extension_state', '005');

  let D127_states_to = new Set();
  D127_states_to.add('024');
  D127.set('states_to', D127_states_to);

  let J002 = new Map();
        
  J002.set('description',  'Close state');
  J002.set('number',  '002');
  J002.set('type',  'J');
  J002.set('receipt_delivered_screen',  '132');
  J002.set('next_state',  '000');
  J002.set('no_receipt_delivered_screen',  '132');
  J002.set('card_retained_screen_number',  '136');
  J002.set('statement_delivered_screen_number',  '132');
  J002.set('bna_notes_returned_screen',  '081');
  J002.set('extension_state',  '178');

  [B500, D127, J002].forEach( state => {
    n.states[state.get('number')] = state;
  });

  [B500, D127, J002].forEach( state => {
    t.deepEqual(n.get(state.get('number')), state);
  });

  let states_prepared = {};
  [B500, D127, J002].forEach( state => {
    states_prepared[state.get('number')] = n.convertMapToObject(state);
  });
  
  t.deepEqual(n.prepareStatesToSave(), states_prepared);
});


/**
 * checkVersion()
 */

test('should restore states if package and settings versions match', t => {
  let settings = new Map();
  let settings_states = { 
    '107': {
      'description': 'Eight FDK selection state',
      'number': '107',
      'type': 'Y',
      'screen_number': '047',
      'timeout_next_state': '002',
      'cancel_next_state': '131',
      'FDK_next_state': '108', 
      'extension_state': '255',
      'buffer_positions': '000',
      'FDK_active_mask': '255',
      'multi_language_screens': '255'
    }
  };
    
  settings.set('states_version', pkgjson.version);
  settings.set('states', settings_states);

  const n = new StatesService(settings);

  let Y107 = new Map ();

  Y107.set('description', 'Eight FDK selection state');
  Y107.set('number', '107');
  Y107.set('type', 'Y');
  Y107.set('screen_number', '047');
  Y107.set('timeout_next_state', '002');
  Y107.set('cancel_next_state', '131');
  Y107.set('FDK_next_state', '108');
  Y107.set('extension_state', '255');
  Y107.set('buffer_positions', '000');
  Y107.set('FDK_active_mask', '255');
  Y107.set('multi_language_screens', '255');

  t.deepEqual(n.get('107'), Y107);
  t.is(settings.get('states_version'), pkgjson.version);
});

test('should not restore states if package and settings version mismatch', t => {
  let settings = new Map();
  let settings_states = { 
    '107': {
      'description': 'Eight FDK selection state',
      'number': '107',
      'type': 'Y',
      'screen_number': '047',
      'timeout_next_state': '002',
      'cancel_next_state': '131',
      'FDK_next_state': '108', 
      'extension_state': '255',
      'buffer_positions': '000',
      'FDK_active_mask': '255',
      'multi_language_screens': '255'
    }
  };
    
  settings.set('states_version', '0.2.0');
  settings.set('states', settings_states);

  const n = new StatesService(settings);
  t.deepEqual(n.states, {});
  t.is(settings.get('states_version'), pkgjson.version);
});


test('should not restore states if settings version is undefined', t => {
  let settings = new Map();
  let settings_states = { 
    '107': {
      'description': 'Eight FDK selection state',
      'number': '107',
      'type': 'Y',
      'screen_number': '047',
      'timeout_next_state': '002',
      'cancel_next_state': '131',
      'FDK_next_state': '108', 
      'extension_state': '255',
      'buffer_positions': '000',
      'FDK_active_mask': '255',
      'multi_language_screens': '255'
    }
  };
    
  settings.set('states', settings_states);

  const n = new StatesService(settings);
  t.deepEqual(n.states, {});
  t.is(settings.get('states_version'), pkgjson.version);
});
