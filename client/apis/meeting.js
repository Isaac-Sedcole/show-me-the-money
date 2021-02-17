import request from 'superagent'

const baseUrl = '/api/v1'

export function getUsers () {
  return request.get(baseUrl)
  .then(res => res.body)
}