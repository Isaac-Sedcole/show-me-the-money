const express = require('express')
const router = express.Router()

const { getMeetings,
        getMeeting,
        addMeeting,
        updateMeeting } = require('../db/meetings')



router.get('/', (req, res) => {
  return getMeetings()
    .then(meetings => {
      res.json(meetings)
  })
})

router.post('/', (req, res) => {
  const meeting = req.body
  return addMeeting(meeting)
    .then(() => {
      res.sendStatus(200)
      return null
    })
})

module.exports = router
