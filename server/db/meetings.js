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
            .join("attendees", "attendees.user_id", "users.id")
            .where("attendees.meeting_id", meetingId)
            .select("users.id as user_Id", "users.username")
            .then((users) => {
              // console.log(users)
              meeting.users = users
              return meeting;
            });
        })
      );
    })
    .then((meeting) => {
      return meeting;
    });
}

// function addMeeting(meeting, userids, db = connection) {
//   return db("meetings")
//     .insert(meeting)
//     .then((meetingId) => {
//       console.log(meetingId)
//       return userids.map((userid) => {
//         return db("attendees")
//           .insert({
//             user_id: userid,
//             meeting_id: meetingId[0],
//           });
//       });
//     });
// }

function addMeeting(meeting, db = connection) {
  return db("meetings")
    .insert(meeting)
    
} 


function addMeetingAttendees(meetingId, userids, db = connection) {
  return Promise.all(
    userids.map((userid) => {
      return db("attendees")
        .insert({
          user_id: userid,
          meeting_id: meetingId,
        })
      }))
}

function updateMeeting(meeting, db = connection) {
  return db("meetings").where("id", meeting.id).update(meeting);
}

module.exports = {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting,
  addMeetingAttendees
}
