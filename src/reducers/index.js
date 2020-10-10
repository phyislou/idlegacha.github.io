import { combineReducers } from 'redux'
import systemValue from './systemValue'// 系统参数，比如显示在哪个主页面，需要缓存
import tempValue from './tempValue'// 系统参数，不需要缓存的临时数据，比如是否打开了提醒页面
import userValue from './userValue'// 用户数据

export default combineReducers({
  systemValue,
  tempValue,
  userValue
})
