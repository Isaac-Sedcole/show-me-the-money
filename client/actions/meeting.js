import { getMeetings } from '../../server/db/meetings'
import { addMeeting, getUsers } from '../apis/meeting'

export const SET_USERS = 'SET_USERS'
export const SET_MEETINGS = 'SET_MEETINGS'

export function setUsers (users) {
  return {
    type: SET_USERS,
    users: users
  }
}

export function setMeetings(meetings) {
  return {
    type: SET_MEETINGS,
    meetings
  }
}

export function fetchMeetings() {
  return dispatch => {
    return getMeetings()
    .then(meetings => {
      dispatch(setMeetings(meetings))
      return null
    })
  }
}

export function fetchUsers () {
  return dispatch => {
   return getUsers()
    .then((users) => {
      dispatch(setUsers(users))
      return null
    })
  }
}

export function addMeetingAction(meeting, userIds) {
  return dispatch => {
    return addMeeting(meeting, userIds)
      .then(() => {
        dispatch(fetchMeetings())
        return null
      })
  }
}
