
exports.up = function(knex) {
  return knex.schema.createTable('meetings', table => {
    table.increments('id').primary()
    table.string('meeting_name')
    table.timestamp('time')
    table.integer('attendees')
    table.integer('meeting_length')
    table.decimal('cost')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('meetings')
};
