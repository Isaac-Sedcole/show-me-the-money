
exports.up = function(knex) {
  return knex.schema.createTable('meetings', table => {
    table.increments('id').primary()
    table.string('meeting_name')
    table.timestamp('time')
    table.integer('attendees')
    table.decimal('cost')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('meetings')
};
