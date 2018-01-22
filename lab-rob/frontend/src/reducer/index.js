import {combineReducers} from 'redux';

import expenses from './expense';
import categories from './category';

export default combineReducers({
  categories,
  expenses,
});