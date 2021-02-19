
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(function () {
      // Inserts seed entries
      return knex('meetings').insert([
        { 
          id: 1, 
          meeting_name: 'first meeting', 
          time: "2021-02-19T01:04:50.492Z", 
          attendees: 2,
          meeting_length: 1800,
          cost: 1000.67 
        },
      ]);
    });
};
