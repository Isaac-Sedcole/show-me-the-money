import { getUsers } from '../apis/meeting'

export const SET_USERS = 'SET_USERS'

export function setUsers (users) {
  return {
    type: SET_USERS,
    users: users
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