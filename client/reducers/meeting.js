import { SET_MEETING, UPDATE_RECENT } from '../actions/meeting'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING:
      return action.meeting
    case UPDATE_RECENT:
      return action.meeting
    default:
      return state
  }
}

export default reducer
