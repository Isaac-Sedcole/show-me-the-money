const { generateHash } = require('authenticare/server')


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          {
            id: 1,
            username: 'admin',
            password: 'Krang',
            first_name: 'Admin',
            last_name: 'Istrator',
            hourly_wage: 300,
          },
          {
            id: 2,
            username: 'miguel',
            password: 'password',
            first_name: 'Miguel',
            last_name: 'Parqueno',
            hourly_wage: 250,
          }
        ].map(user => {
          return generateHash(user.password)
            .then(hash => {
              user.hash = hash
              delete user.password
              return user
            })
        }))
        .then(users => {
          return knex('users').insert(users)
        })
    })
}
