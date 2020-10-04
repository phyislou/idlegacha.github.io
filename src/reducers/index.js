import { combineReducers } from 'redux'
import text from './text'
import systemValue from './systemValue'
import userValue from './userValue'

export default combineReducers({
  text,
  systemValue,
  userValue
})
