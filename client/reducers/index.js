import {combineReducers} from 'redux'

import auth from './auth'
import users from './users'
import meetings from './meetings'

export default combineReducers({
  auth,
  users,
  meetings
})
