import request from 'superagent'

const baseUrl = '/api/v1'

export function getUsers () {
  return request.get(baseUrl)
  .then(res => res.body)
}

export function addMeeting(meeting, userids) {
  return request.post(baseUrl+"/meetings")
  .send(meeting,userids)
  .then(res => res.body)
}