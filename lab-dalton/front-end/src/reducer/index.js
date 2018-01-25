import {combineReducers} from 'redux';

import categories from './categories';
import wizards from './wizards';

export default combineReducers ({
  categories,
  wizards,
});