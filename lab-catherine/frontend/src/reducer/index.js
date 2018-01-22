import {combineReducers} from 'redux';

import categories from './categories';
import expenses from './expenses';

export default combineReducers ({
  categories,
  expenses,
});