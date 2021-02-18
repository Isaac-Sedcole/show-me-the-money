import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchMeetings } from '../actions/meeting'

function History(props) {

  console.log(props)

  // const [recentMeeting, setRecentMeeting] = useState([]) 
  // const [recentTime, setRecentTime] = useState(0)

	// useEffect(() => {
  //   props.dispatch(fetchMeetings())
  //   setRecentMeeting(props.meetings.map(meeting => {
  //     let newTime = Date.parse(meeting.time)
  //     console.log(newTime)
  //     if(newTime > recentTime) {
  //       setRecentTime(newTime)
  //     }
  //     if(Date.UTC(meeting.time) == recentTime ) {
  //       return meeting
  //     }
  //     else {
  //       return null
  //     }
  //   }))
  // }, [])


  // console.log(props.meetings)

	return (
		<div className="container">
			<h2 className="title is-2">Meeting history</h2>
         <ul>
        {/* {props.meetings.map(meeting => {
          return(
            <li key={meeting.id}>
              Meeting:  {meeting.meeting_name} 
              Time:  {Date(recentTime)}</li>
          )
        })} */}
      </ul>
      
		</div>
	)
}

const mapStateToProps = (globalState) => {
	return {
		meetings: globalState.meetings,
	}
}

export default connect(mapStateToProps)(History)
