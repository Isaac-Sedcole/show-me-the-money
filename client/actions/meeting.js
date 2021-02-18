<<<<<<< HEAD
import { addMeeting, getUsers, getMeetings  } from '../apis/meeting'
=======
import { addMeeting, getUsers, getMeetings } from '../apis/meeting'
>>>>>>> 67ad95edc11807eb208a310d1d1a74482d15c1d0

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
