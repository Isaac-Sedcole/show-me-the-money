import { addMeeting, getUsers, getMeetings, getMeeting } from '../apis/meeting'

export const SET_USERS = 'SET_USERS'
export const SET_MEETINGS = 'SET_MEETINGS'
export const UPDATE_RECENT = 'UPDATE_RECENT'
export const SET_MEETING = 'SET_MEETING'

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

export function setMeeting(meeting) {
  return {
    type: SET_MEETING,
    meeting
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

export function fetchMeeting(id) {
  // console.log("being called")
  return dispatch => {
    return getMeeting(id)
    .then(meeting => {
      dispatch(setMeeting(meeting))
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
  // console.log(meeting, userIds)
  return dispatch => {
    return addMeeting(meeting, userIds)
      .then(id => {
        console.log(id)
        return getMeeting(id)
        .then(() => {
          dispatch(fetchMeetings())
          return null
        })
      })
  }
}

export function updateRecentMeeting(meeting) {
  return {
    type: UPDATE_RECENT,
    meeting
  }
}
