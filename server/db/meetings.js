const connection = require('./connection')

function getMeetings (db = connection) {
  return db('meetings')
    .select()
} 

function getMeeting (id, db = connection) {
  return db('meetings')
    .where('id', id)
    .select()
    .first()
}

function addMeeting (meeting, db = connection) {
  return db('meetings')
    .insert(meeting)
}

function updateMeeting (meeting, db = connection) {
  return db('meetings')
    .where('id', meeting.id)
    .update(meeting)
}



module.exports = {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting
}