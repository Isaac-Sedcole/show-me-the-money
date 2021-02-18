import { SET_MEETINGS } from '../actions/meeting'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETINGS:
      return action.meetings
    default:
      return state
  }
}

export default reducer


