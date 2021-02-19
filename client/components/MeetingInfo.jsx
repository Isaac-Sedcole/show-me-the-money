import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMeeting } from '../actions/meeting'
import { getMeeting } from '../apis/meeting'

function MeetingInfo (props) {

  const [attendeesShowing, setAttendeesShowing ] = useState(false)
  const [ meeting, setMeeting ] = useState({})

  const meetingLocal = props.meetingLocal
  // const meeting = props.meeting
  
    // useEffect(() => {
    //   props.dispatch(fetchMeeting(meetingLocal.id))
    // },[])

    useEffect(() => {
      getMeeting(meetingLocal.id)
        .then(meeting => {
          console.log('thisone',meeting)
          setMeeting(meeting[0])
        })
    }, [])
    
    const [infoShowing, setInfoShowing] = useState(false)
    
    const handleClick = () => {
      setInfoShowing(!infoShowing)
      // fetchMeeting(meetingId)
    }
    
    const handleAttendees = () => {
      props.dispatch(fetchMeeting(meetingLocal.id))
      setAttendeesShowing(!attendeesShowing)
    }
    // const meeting = props.meeting[0]
  return (
    <div>
    <button onClick={handleClick}>{meetingLocal.meeting_name} 
      <em>{meetingLocal.time}</em>
    </button>
    {infoShowing && 
      <ul>
        
        <li>Attendees: {meetingLocal.attendees}</li>
        <li>Meeting date: {meetingLocal.time.substr(0, 10)}</li>
        <li>Meeting time: {meetingLocal.time.substr(11, 8)}</li>
        <li>Total cost: ${meetingLocal.cost}</li>
        <li>
          <button onClick={handleAttendees}>
            view Meeting attendees
          </button>
        
          {attendeesShowing && 
          <ul>
            {meeting.users.map(user => {
              return (
                <li key={user.user_Id}>{user.username}</li>
              )
            })}
          </ul>}
        </li>
      </ul>
    }
    </div>
  ) 
}

// const mapStateToProps = (globalState) => {
//   return {
//     meeting: globalState.meeting
//     // meeting: globalState.meeting
//   }
// }

export default connect()(MeetingInfo)