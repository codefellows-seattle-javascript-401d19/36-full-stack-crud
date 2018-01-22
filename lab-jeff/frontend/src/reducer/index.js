import { combineReducers } from 'redux';

import schools from './schools';
import expenses from './expenses';

export default combineReducers({
  schools,
  expenses,
});
