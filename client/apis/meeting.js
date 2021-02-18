import request from 'superagent'

const baseUrl = ''

export function getUsers () {
  return request.get(baseUrl + '')
  .then(res => res.body)
}