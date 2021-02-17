
exports.up = function(knex) {
  return knex.schema.createTable('attendees', table => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('meeting_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('attendees')
};
