const express = require('express')
const router = express.Router()

const { getMeetings,
        getMeeting,
        addMeeting,
        updateMeeting, 
        addMeetingAttendees } = require('../db/meetings')



router.get('/', (req, res) => {
  return getMeetings()
    .then(meetings => {
      res.json(meetings)
  })
})

router.get('/:id', (req, res) => {
  meetingId = req.params.id
  return getMeeting(meetingId)
    .then(meeting => {
      res.json(meeting)
    })
})

router.post('/', (req, res) => {
  const meeting = req.body.meeting
  const userids = req.body.userids
  return addMeeting(meeting)
    .then(meetingId => {
      // console.log(meetingId)
      addMeetingAttendees(meetingId[0], userids)
        .then(() => {
          res.sendStatus(200)
          return null
      })
    })
})

module.exports = router
