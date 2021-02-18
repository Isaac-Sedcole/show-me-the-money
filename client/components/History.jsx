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
    
    
    console.log(reversedMeetings)
    return (
      <div className="container">
			<h2 className="title is-2">Meeting history</h2>
      { reversedMeetings &&
        <div>
         <ul>
          <li><h2>Meeting name: {reversedMeetings.meeting_name}</h2></li>
          <li>Date of meeting: {reversedMeetings.time.substr(0,10)}</li>
          <li>
            time of meeting : {reversedMeetings.time.substr(11,8)}
          </li>
          <li>How many people attended: {reversedMeetings.attendees}</li>
          <li>${reversedMeetings.cost.toFixed(2)}</li>
          <li>Meeting Length(seconds): {reversedMeetings.meeting_length}</li>
        </ul>
          <form onSubmit={handleSubmit}>
            <label> Add comments:
              <input type="text" name="comments" placeholder="comment here"></input>
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
