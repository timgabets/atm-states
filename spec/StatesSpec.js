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
    it("should return empty edges when there is no states", function(){
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
 });

  describe('delete()', function(){
 });


});
