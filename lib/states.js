
class StatesService{
  constructor(){

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


  parseState(data){
    return false;
  }
}

module.exports=StatesService;

