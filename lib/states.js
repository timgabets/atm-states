
class StatesService{
  constructor(settings, log, trace){
    this.settings = settings;
    this.log = log;
    this.trace = trace;
  }
  /**
   * [getEntry get the state entry, e.g. state entry 3 is a substring of original state string from position 7 to position 10 ]
   * @param  {[type]} data  [state data to parse]
   * @param  {[type]} entry [state entry to get]
   * @return {[type]}       [3-bytes long state entry on success, null otherwise]
   */
  getEntry(data, entry){
    if(entry > 0 && entry < 2)
      return data.substring(3, 4);
    else if (entry < 10)            
      return data.substring(1 + 3 * (entry - 1), 4 + 3 * (entry - 1));

    return null;
  }


  /**
   * [parseState description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  parseState(data){
    /**
     * [addStateLinks add states_to property to the given state object. After running this function, state.states_to contains state exits]
     * @param {[type]} state      [state]
     * @param {[type]} properties [array of properties, containing the state numbers to go, e.g. ['500', '004']]
     */
    function addStateLinks(state, properties){
      let states_to = [];
      properties.forEach( (property, index) => {
        states_to.push(state.get(property));
      });
      state.set('states_to', states_to);
    }

    let parsed = new Map();
    parsed.set('description', '');
    parsed.set('number', data.substring(0, 3));
    if(isNaN(parsed.get('number')))
      return null;

    parsed.set('type', this.getEntry(data, 1));
        
    switch(parsed.get('type')){
    case 'A':
      parsed.set('description', 'Card read state');
      [ 'screen_number',           /* State entry 2 */
        'good_read_next_state',     /* State entry 3 */
        'error_screen_number',      /* State entry 4 */
        'read_condition_1',         /* State entry 5 */
        'read_condition_2',         /* State entry 6 */
        'read_condition_3',         /* State entry 7 */
        'card_return_flag',         /* State entry 8 */
        'no_fit_match_next_state',  /* State entry 9 */
      ].forEach( (element, index) => {
        parsed.set(element,  this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['good_read_next_state', 'no_fit_match_next_state']);
      break;

    case 'B':
      parsed.set('description', 'PIN Entry state');
      [ 'screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'local_pin_check_good_next_state',
        'local_pin_check_max_bad_pins_next_state',
        'local_pin_check_error_screen',
        'remote_pin_check_next_state',
        'local_pin_check_max_retries',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'local_pin_check_good_next_state', 'local_pin_check_max_bad_pins_next_state', 'remote_pin_check_next_state']);
      break;
 
    case 'b':
      parsed.set('description', 'Customer selectable PIN state');
      [ 'first_entry_screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'good_read_next_state',
        'csp_fail_next_state',
        'second_entry_screen_number',
        'mismatch_first_entry_screen_number',
        'extension_state',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'good_read_next_state', 'csp_fail_next_state']);
      break;
        
    case 'C':
      parsed.set('description', 'Envelope Dispenser state');
      ['next_state',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['next_state',]);
      break;

    case 'D':
      parsed.set('description', 'PreSet Operation Code Buffer');
      [ 'next_state',
        'clear_mask',
        'A_preset_mask',
        'B_preset_mask',
        'C_preset_mask',
        'D_preset_mask',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      parsed.set('extension_state', this.getEntry(data, 9));
      addStateLinks(parsed, ['next_state',]);
      break;

    case 'E':
      parsed.set('description', 'Four FDK selection state');
      [ 'screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'FDK_A_next_state',
        'FDK_B_next_state',
        'FDK_C_next_state',
        'FDK_D_next_state',
        'buffer_location',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'FDK_A_next_state', 'FDK_B_next_state', 'FDK_C_next_state', 'FDK_D_next_state']);
      break;

    case 'F':
      parsed.set('description', 'Amount entry state');
      [ 'screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'FDK_A_next_state',
        'FDK_B_next_state',
        'FDK_C_next_state',
        'FDK_D_next_state',
        'amount_display_screen',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'FDK_A_next_state', 'FDK_B_next_state', 'FDK_C_next_state', 'FDK_D_next_state']);
      break;

    case 'G':
      parsed.set('description', 'Amount check state');
      [ 'amount_check_condition_true',
        'amount_check_condition_false',
        'buffer_to_check',
        'integer_multiple_value',
        'decimal_places',
        'currency_type',
        'amount_check_condition',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['amount_check_condition_true', 'amount_check_condition_false']);
      break;

    case 'H':
      parsed.set('description', 'Information Entry State');
      [ 'screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'FDK_A_next_state',
        'FDK_B_next_state',
        'FDK_C_next_state',
        'FDK_D_next_state',
        'buffer_and_display_params',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'FDK_A_next_state', 'FDK_B_next_state', 'FDK_C_next_state', 'FDK_D_next_state']);
      break;

    case 'I':
      parsed.set('description', 'Transaction request state');
      [ 'screen_number',
        'timeout_next_state',
        'send_track2',
        'send_track1_track3',
        'send_operation_code',
        'send_amount_data',
        'send_pin_buffer',
        'send_buffer_B_buffer_C',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state',]);
      break;

    case 'J':
      parsed.set('description', 'Close state');
      [ 'receipt_delivered_screen',
        'next_state',
        'no_receipt_delivered_screen',
        'card_retained_screen_number',
        'statement_delivered_screen_number',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });

      parsed.set('bna_notes_returned_screen', this.getEntry(data, 8));
      parsed.set('extension_state', this.getEntry(data, 9));
                
      if(parsed.get('next_state') !== '000')
        addStateLinks(parsed, ['next_state']);
      break;

    case 'k':
      parsed.set('description', 'Smart FIT check state');
      parsed.set('good_read_next_state', this.getEntry(data, 3));
      parsed.set('card_return_flag', this.getEntry(data, 8));
      parsed.set('no_fit_match_next_state', this.getEntry(data, 9));
      addStateLinks(parsed, ['good_read_next_state']);
      break;

    case 'K':
      {
        parsed.set('description', 'FIT Switch state');
        let states_to = [];
        for(let i = 2; i < 10; i += 1)
          states_to.push(this.getEntry(data, i));
        
        parsed.set('states_to', states_to);
      }
      break;

    case 'm':
      parsed.set('description', 'PIN & Language Select State');
      [ 'screen_number', 
        'timeout_next_state',
        'cancel_next_state',
        'next_state_options_extension_state',
        'operation_codes_extension_state',
        'buffer_positions',
        'FDK_active_mask',
        'multi_language_screens_extension_state'
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state',]);
      break;

    case 'U':
      parsed.set('description', 'Device Fitness Flow Select State');
      [ 'device_number', 
        'device_available_next_state',
        'device_identifier_grafic',
        'device_unavailable_next_state',
        'device_subcomponent_identifier'
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['device_available_next_state', 'device_unavailable_next_state',]);
      break;

    case 'W':
      {
        parsed.set('description', 'FDK Switch state');
        let states = {};
        let states_to = [];
        ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I'].forEach( (element, index) => {
          states[element] = this.getEntry(data, index + 2);
          states_to.push(states[element]);
        });
        parsed.set('states', states);
        parsed.set('states_to', states_to);
      }
      break;
 
    case 'X':
      parsed.set('description', 'FDK information entry state');
      [ 'screen_number', 
        'timeout_next_state', 
        'cancel_next_state', 
        'FDK_next_state', 
        'extension_state', 
        'buffer_id', 
        'FDK_active_mask',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'FDK_next_state']);
      break;

    case 'Y':
      parsed.set('description', 'Eight FDK selection state');
      [ 'screen_number',
        'timeout_next_state',
        'cancel_next_state',
        'FDK_next_state',
        'extension_state',
        'buffer_positions',
        'FDK_active_mask',
        'multi_language_screens',
      ].forEach( (element, index) => {
        parsed.set(element, this.getEntry(data, index + 2));
      });
      addStateLinks(parsed, ['timeout_next_state', 'cancel_next_state', 'FDK_next_state']);
      break;
   
    case 'Z':
    /**
           * Accessing Z state entries may be perfromed by state.entries[i] - to get i-th table entry as it's written in NDC's spec. 
           * E.g. state.entries[1] is 'Z', state.entry[4] is "Z state table entry 4"
           */
      /*
          parsed.set('description', 'Extension state'
          parsed.entries = [null, 'Z'];
          for(let i = 2; i < 10; i++)
            parsed.entries.push(this.getEntry(data, i))
          break;

        case '>':
          parsed.set('description', 'Cash deposit state';
          ['cancel_key_mask',
          'deposit_key_mask',
          'add_more_key_mask',
          'refund_key_mask',
          'extension_state_1',
          'extension_state_2',
          'extension_state_3',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          break;

        case '/':
          parsed.set('description', 'Complete ICC selection';
          ['please_wait_screen_number',
          'icc_app_name_template_screen_number',
          'icc_app_name_screen_number',
          'extension_state',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          break;

        case '?':
          parsed.set('description', 'Set ICC transaction data';
          ['next_state',
          'currency_type',
          'transaction_type',
          'amount_authorized_source',
          'amount_other_source',
          'amount_too_large_next_state',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, ['next_state', 'amount_too_large_next_state']);
          break;

        case 'z':
          parsed.set('description', 'EMV ICC Application Switch state';
          ['next_state',
          'terminal_aid_extension_1',
          'next_state_extension_1',
          'terminal_aid_extension_2',
          'next_state_extension_2',
          'terminal_aid_extension_3',
          'next_state_extension_3',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          break;

        case '+':
          parsed.set('description', 'Begin ICC Initialization state';
          ['icc_init_started_next_state',
          'icc_init_not_started_next_state',
          'icc_init_requirement',
          'automatic_icc_app_selection_flag',
          'default_app_label_usage_flag',
          'cardholder_confirmation_flag',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, ['icc_init_started_next_state', 'icc_init_not_started_next_state']);
          break;

        case ',':
          parsed.set('description', 'Complete ICC Initialization state';
          ['please_wait_screen_number',
          'icc_init_success',
          'card_not_smart_next_state',
          'no_usable_applications_next_state',
          'icc_app_level_error_next_state',
          'icc_hardware_level_error_next_state',
          'no_usable_applications_fallback_next_state',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, [
            'icc_init_success',
            'card_not_smart_next_state',
            'no_usable_applications_next_state',
            'icc_app_level_error_next_state',
            'icc_hardware_level_error_next_state',
            'no_usable_applications_fallback_next_state',
          ]);
          break;

        case '-':
          parsed.set('description', 'Automatic Language Selection state';
          ['language_match_next_state',
          'no_language_match_next_state',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, [
            'language_match_next_state',
            'no_language_match_next_state',
          ]);
          break;

        case '.':
          parsed.set('description', 'Begin ICC Application Selection & Initialization state';
          ['cardholder_selection_screen_number',
          'FDK_template_screen_numbers_extension_state',
          'action_keys_extension_state_number',
          'exit_paths_extension_state_number',
          'single_app_cardholder_selection_screen_number',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          break;

        case ';':
          parsed.set('description', 'ICC Re-initialize state';
          ['good_read_next_state',
          'processing_not_performed_next_state',
          'reinit_method',
          'chip_power_control',
          'reset_terminal_pobjects',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, [
            'good_read_next_state',
            'processing_not_performed_next_state',
          ]);
          break;

        case '&':
          parsed.set('description', 'Barcode Read State';
          ['screen_number',
           'good_read_next_state',
           'cancel_next_state',
           'error_next_state',
           'timeout_next_state',
          ].forEach( (element, index) => {
            parsed.set(element, this.getEntry(data, index + 2)
          });
          addStateLinks(parsed, [
           'good_read_next_state',
           'cancel_next_state',
           'error_next_state',
           'timeout_next_state',
          ]);
          */
      break;

    default:
      if(this.log)
        this.log.info('StatesService.parseState(): error processing state ' + parsed.number + ': unsupported state type ' + parsed.type);
      return null;
    }

    return parsed;
  }

}

module.exports=StatesService;

