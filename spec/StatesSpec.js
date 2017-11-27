describe("States", function() {
  var StatesService = require('../states.js');
  var log, settings, s;

  beforeEach(function() {
    log = {
      info: function() {
      },
      error: function() {
      }
    };
    
    settings = {
      get: function() {
        return {};
      },
      set: function(value){
      }
    };

    s = new StatesService(settings, log);
  });

  describe("getEntry()", function(){
    it("should get entry 1", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 1)).toEqual('A');
    });

    it("should get entry 2", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 2)).toEqual('BCD');
    }) ;
    
    it("should get entry 3", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 3)).toEqual('EFG');
    });

    it("should get entry 4", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 4)).toEqual('HIJ');
    });

    it("should get entry 5", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 5)).toEqual('KLM');
    });

    it("should get entry 6", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 6)).toEqual('NOP');
    });

    it("should get entry 7", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 7)).toEqual('QRS');
    });

    it("should get entry 8", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 8)).toEqual('TUV');
    });

    it("should get entry 9", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 9)).toEqual('WXY');
    });

    it("should get entry 10", function() {
      expect(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 10)).toBeNull();
    });
  });  


  describe("add()", function(){
 });

  describe("getNodes()", function(){
 })

  describe("getEdges()", function(){
    it("should return empty edges where there is no states", function(){
      var edges = [];
      expect(s.getEdges()).toEqual(edges);
    })

    it("should return edges when single state added", function(){
      var edges = [
        {'from': '000', 'to': '500'},
        {'from': '000', 'to': '127'}
      ];
      var states = ['000A870500128002002002001127',];
      
      expect(s.add(states)).toBeTruthy();
      expect(s.getEdges()).toEqual(edges);
    })

    it("should return edges when added multiple states", function(){
      var edges = [
        {'from': '000', 'to': '500'},
        {'from': '000', 'to': '127'},
        {'from': '001', 'to': '003'},
        {'from': '001', 'to': '004' }, 
        {'from': '001', 'to': '004' }, 
        {'from': '001', 'to': '127' }, 
        {'from': '001', 'to': '127' }, 
        {'from': '001', 'to': '127' }, 
        {'from': '001', 'to': '127' }, 
        {'from': '001', 'to': '127' }
      ];
      var states = ['000A870500128002002002001127', '001K003004004127127127127127'];
      
      expect(s.add(states)).toBeTruthy();
      expect(s.getEdges()).toEqual(edges);
    })
  })

  describe("clearStateLevels()", function(){
 });

  describe("setStateLevels()", function(){
 });

  describe("updateStateLevels()", function(){
    it("should update state levels with depth 1", function(){
      var parsed = { 
        number: '000', 
        type: 'A', 
        description: 'Card read state',
        screen_number: '870', 
        good_read_next_state: '500', 
        error_screen_number: '128', 
        read_condition_1: '002', 
        read_condition_2: '002', 
        read_condition_3: '002', 
        card_return_flag: '001', 
        no_fit_match_next_state: '127',
        states_to: [ '500', '127' ]
      };

      expect(s.addState('000A870500128002002002001127')).toBeTruthy();
      expect(s.get('000')).toEqual(parsed);

      expect(s.addState('500Zxxxxxxxxxxxxxxxxxxxxxxxx')).toBeTruthy();
      expect(s.addState('127Zxxxxxxxxxxxxxxxxxxxxxxxx')).toBeTruthy();
      s.updateStateLevels();

      expect(s.get('000')['level']).toEqual(1);
      expect(s.get('500')['level']).toEqual(2);
      expect(s.get('127')['level']).toEqual(2);
    })

    it("should update state levels with depth 2", function(){
      // Level 0
      var A000 = { 
        number: '000', 
        type: 'A', 
        description: 'Card read state',
        screen_number: '870', 
        good_read_next_state: '500', 
        error_screen_number: '128', 
        read_condition_1: '002', 
        read_condition_2: '002', 
        read_condition_3: '002', 
        card_return_flag: '001', 
        no_fit_match_next_state: '127',
        states_to: [ '500', '127' ]
      };
      expect(s.addState('000A870500128002002002001127')).toBeTruthy();
      expect(s.get('000')).toEqual(A000);

      // Level 1
      var B500 = { 
        number: '500', 
        type: 'B', 
        description: 'PIN Entry state',
        screen_number: '024', 
        timeout_next_state: '002', 
        cancel_next_state: '131', 
        local_pin_check_good_next_state: '026', 
        local_pin_check_max_bad_pins_next_state: '026', 
        local_pin_check_error_screen: '138', 
        remote_pin_check_next_state: '026', 
        local_pin_check_max_retries: '003',
        states_to: [ '002', '131', '026', '026', '026' ]
      };
      expect(s.addState('500B024002131026026138026003')).toBeTruthy();
      expect(s.get('500')).toEqual(B500);

      var D127 ={ 
        number: '127', 
        type: 'D', 
        description:'PreSet Operation Code Buffer',
        next_state: '024', 
        clear_mask: '000', 
        A_preset_mask: '128', 
        B_preset_mask: '001', 
        C_preset_mask: '002', 
        D_preset_mask: '003', 
        extension_state: '005',
        states_to: [ '024' ]
      };
      expect(s.addState('127D024000128001002003004005')).toBeTruthy();
      expect(s.get('127')).toEqual(D127);

      // Level 2
      var J002 = { 
        number: '002', 
        type: 'J',
        description: 'Close state',
        receipt_delivered_screen: '132', 
        next_state: '000', 
        no_receipt_delivered_screen: '132', 
        card_retained_screen_number: '136', 
        statement_delivered_screen_number: '132', 
        bna_notes_returned_screen: '081', 
        extension_state: '178'
      };
      expect(s.addState('002J132000132136132000081178')).toBeTruthy();
      expect(s.get('002')).toEqual(J002);

      var J131 = { 
        number: '131', 
        type: 'J',
        description: 'Close state',
        receipt_delivered_screen: '132', 
        next_state: '000', 
        no_receipt_delivered_screen: '132', 
        card_retained_screen_number: '136', 
        statement_delivered_screen_number: '132', 
        bna_notes_returned_screen: '081', 
        extension_state: '178'
      };
      expect(s.addState('131J132000132136132000081178')).toBeTruthy();
      expect(s.get('131')).toEqual(J131);

      var J026 = { 
        number: '026', 
        type: 'J',
        description: 'Close state',
        receipt_delivered_screen: '132', 
        next_state: '000', 
        no_receipt_delivered_screen: '132', 
        card_retained_screen_number: '136', 
        statement_delivered_screen_number: '132', 
        bna_notes_returned_screen: '081', 
        extension_state: '178'
      };
      expect(s.addState('026J132000132136132000081178')).toBeTruthy();
      expect(s.get('026')).toEqual(J026);

      // Updating levels
      s.updateStateLevels();

      expect(s.get('000')['level']).toEqual(1);
      expect(s.get('500')['level']).toEqual(2);
      expect(s.get('127')['level']).toEqual(2);
      expect(s.get('002')['level']).toEqual(3);
      expect(s.get('131')['level']).toEqual(3);
      expect(s.get('026')['level']).toEqual(3);
    })

    it("should not change level if states_to contains the state itself", function(){
      // Level 0
      var A000 = { 
        number: '000', 
        type: 'A', 
        description: 'Card read state',
        screen_number: '870', 
        good_read_next_state: '219', 
        error_screen_number: '128', 
        read_condition_1: '002', 
        read_condition_2: '002', 
        read_condition_3: '002', 
        card_return_flag: '001', 
        no_fit_match_next_state: '127',
        states_to: [ '219', '127' ]
      };
      expect(s.addState('000A870219128002002002001127')).toBeTruthy();
      expect(s.get('000')).toEqual(A000);

      var F219 = { 
        number: '219', 
        type: 'F',
        description: 'Amount entry state',
        screen_number: '069', 
        timeout_next_state: '002', 
        cancel_next_state: '131', 
        FDK_A_next_state: '220', 
        FDK_B_next_state: '255', 
        FDK_C_next_state: '220', 
        FDK_D_next_state: '219', 
        amount_display_screen: '006',
        states_to: [ '002', '131', '220', '255', '220', '219' ]
      };
      expect(s.addState('219F069002131220255220219006')).toBeTruthy();   
      expect(s.get('219')).toEqual(F219);

      s.updateStateLevels();
      expect(s.get('000')['level']).toEqual(1);
      expect(s.get('219')['level']).toEqual(2);

    });
  });

  describe('delete()', function(){
    it('should return false if state does not exist', function(){
      expect(s.delete('219')).toBeFalsy();
    });

    it('should delete state', function(){
      expect(s.addState('219F069002131220255220219006')).toBeTruthy();   
      expect(s.get('219')).not.toBeUndefined();
      
      expect(s.delete('219')).toBeTruthy();
      expect(s.get('219')).toBeUndefined();
    });
  });


});
