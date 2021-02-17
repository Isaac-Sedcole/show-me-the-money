
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(function () {
      // Inserts seed entries
      return knex('meetings').insert([
        { id: 1, meeting_name: 'first meeting', time: null, 'attendees': 5, cost: 1000.67 },
      ]);
    });
};
