# atm-states

ATM States Service implementation, used by [Electron ATM](https://github.com/timgabets/electron-atm) and [ATM State Navigator](https://github.com/timgabets/states-navigator) applications. The module may be used for NDC ATM states parsing and processing. 

## To use:
```javascript
const settings = require('electron-settings');
const StatesService = require('atm-states');

var s = new(StatesService);
s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 1)
> 'A'
s.getEntry('000A001002003004005006007008', 2)
> '001'
s.parseState('000A870500128002002002001127')
>{ description: 'Card read state',
  number: '000',
  type: 'A',
  screen_number: '870',
  good_read_next_state: '500',
  error_screen_number: '128',
  read_condition_1: '002',
  read_condition_2: '002',
  read_condition_3: '002',
  card_return_flag: '001',
  no_fit_match_next_state: '127',
  states_to: [ '500', '127' ] }

```


