import { combineReducers } from 'redux';

import category from './category';
import expense from './expense';

export default combineReducers({
  category,
  expense,
});
