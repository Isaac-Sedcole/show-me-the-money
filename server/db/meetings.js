const connection = require("./connection");

function getMeetings(db = connection) {
  return db("meetings").select();
}

function getMeeting(meetingId, db = connection) {
  return db("meetings")
    .where("id", meetingId)
    .then((meetings) => {
      return Promise.all(
        meetings.map((meeting) => {
          return db("users")
            .join("attendees", "attendees.user_id", "user.id")
            .where("attendess.meeting_id", meetingId)
            .select("users.id as user_Id", "users.username")
            .then((users) => {
              meeting.users = users;
              return meeting;
            });
        })
      );
    })
    .then( meeting => {
      return meeting
    })
}

function addMeeting(meeting, db = connection) {
  return db("meetings").insert(meeting);
}

function updateMeeting(meeting, db = connection) {
  return db("meetings").where("id", meeting.id).update(meeting);
}

module.exports = {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting,
};
