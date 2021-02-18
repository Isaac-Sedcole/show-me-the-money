import {combineReducers} from 'redux'

import auth from './auth'
import users from './users'
import meetings from './meetings'
import meeting from './meeting'

export default combineReducers({
  auth,
  users,
  meetings,
  meeting
})
