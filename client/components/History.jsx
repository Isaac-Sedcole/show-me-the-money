import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchMeeting, fetchMeetings, updateRecentMeeting } from '../actions/meeting'

function History(props) {

    const [formData, setFormData] = useState('')

    useEffect(() => {
      props.dispatch(fetchMeetings())
    },[])
    const reversedMeetings = props.meetings.map(m=> m).reverse()[0]

    const handleSubmit = (e) => {
      e.preventDefault()
      setFormData(e.target.meeting_name.value)
      //props.dispatch(addComment(formData))
      e.target.meeting_name.value = ''
    }

    const convertSecondsToMinutes = (time) => {
      const seconds = time % 60
      const minutes = String((time - seconds)/60)
      return minutes + ':' + String(seconds)
    }
    
    
    console.log(reversedMeetings)
    console.log(typeof reversedMeetings.cost)
    return (
      <div className="container">
			<h1>Meeting history</h1>
      { reversedMeetings &&
        <div>
         <ul>
          <li><h2>Meeting name: {reversedMeetings.meeting_name}</h2></li>
          <li>Date of meeting: {reversedMeetings.time.substr(0,10)}</li>
          <li>
            Time of meeting : {reversedMeetings.time.substr(11,8)}
          </li>
          <li>How many people attended: {reversedMeetings.attendees}</li>
          <li>Cost: ${reversedMeetings.cost.toFixed(2)}</li>

          <li>Meeting Length(minutes:seconds): {
          convertSecondsToMinutes(reversedMeetings.meeting_length)}</li>
          <br></br>

        </ul>
          <form onSubmit={handleSubmit}>
            <label> Add comments:
              <br></br>
              <input type="text" name="comments" placeholder="comment here"></input>
              <br></br>
              <br></br>
              <button>Send!</button>
            </label>
          </form>
        </div>
        }
      
		</div>
	)
}

const mapStateToProps = (globalState) => {
	return {
		meetings: globalState.meetings,
	}
}

export default connect(mapStateToProps)(History)
