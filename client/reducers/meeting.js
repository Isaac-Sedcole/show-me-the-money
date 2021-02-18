import { SET_MEETING } from '../actions/meeting'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING:
      return action.meeting
    default:
      return state
  }
}

export default reducer
