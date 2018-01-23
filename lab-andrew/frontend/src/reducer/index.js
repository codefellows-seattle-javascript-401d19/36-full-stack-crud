import {combineReducers} from 'redux';

import synthCompanies from './synthcompanies';
import synths from './synths';

export default combineReducers({
  synthCompanies,
  synths,
});