import {combineReducers} from 'redux'

import category from './catergories'
import expense from './expenses'

export default combineReducers({
  category,
  expense,
})