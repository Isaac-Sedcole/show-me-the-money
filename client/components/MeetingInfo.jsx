import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMeeting } from '../actions/meeting'

function MeetingInfo (props) {

  const meetingLocal = props.meetingLocal
  const meeting = props.meeting[0]
  // const meeting = props.meeting
  
  useEffect(() => {
    props.dispatch(fetchMeeting(meetingLocal.id))
  },[])

  const [infoShowing, setInfoShowing] = useState(false)

  const handleClick = () => {
    setInfoShowing(!infoShowing)
    // fetchMeeting(meetingId)
  }

  return (
    <div>
    <button onClick={handleClick}>{meetingLocal.meeting_name} 
      <em>{meetingLocal.time}</em>
    </button>
    {infoShowing && 
      <ul>
        <li>{meetingLocal.attendees}</li>
        <li>{meetingLocal.time}</li>
        <li>{meetingLocal.cost}</li>
        <li>Meeting attendees:
          <ul>
            {meeting.users.map(user => {
              return (
                <li key={user.user_Id}>{user.username}</li>
              )
            })}
          </ul>
        </li>
      </ul>
    }
    </div>
  ) 
}

const mapStateToProps = (globalState) => {
  return {
    meeting: globalState.meeting
    // meeting: globalState.meeting
  }
}

export default connect(mapStateToProps)(MeetingInfo)