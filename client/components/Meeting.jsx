import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { fetchUsers, addMeetingAction, updateRecentMeeting } from '../actions/meeting'

function Meeting(props) {
	const [count, setCount] = useState(0)
  const [buttonStart, setButtonStart] = useState(true)
  const [attendees, setAttendees] = useState([])
  const [cost, setCost] = useState(0)
  const [formData, setFormData] = useState('')
  const [meeting , setMeeting] = useState(null)
  const [attendeesIds, setAttendeesIds] = useState([])


	useEffect(() => {
    setAttendeesIds(attendees.map(attendee => {
      return attendee.id
    }))
    setMeeting(() => {
      //this needs to be put into a seperate function
      return {
        meeting_name:formData,
        time: new Date(),
        attendees: attendees.length,
        meeting_length: count,
        cost: cost
      }
    })
		let interval = null
		if (!buttonStart) {
    let avgCost = 0
    attendees.map(attendee => {
      avgCost += attendee.hourly_wage 
      return null
    })
    avgCost = avgCost / 3600
			interval = setInterval(() => {
        setCount((count) => count + 1)
        setCost(newCost => newCost + avgCost)
			}, 1000)
		} else {
      clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [buttonStart, count])

	useEffect(() => {
		props.dispatch(fetchUsers())
	}, [])

	const handleButtonChange = (e) => {
		setButtonStart(!buttonStart)
  }
  
  const checkBoxHandler =  (user) => {
    setAttendees(currentAttendees => {
      let newArr = currentAttendees.filter(attendee => {
        return user.id != attendee.id
      })
      return newArr.length == currentAttendees.length 
      ?  [...newArr, user]
      : [...newArr]
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormData(e.target.meeting_name.value)
    e.target.meeting_name.value = ''
  }

  const sendToHistory = () => {
    

      // setMeeting(() => {
      //   //this needs to be put into a seperate function
      //   return {
      //     meeting_name:formData,
      //     time: new Date(),
      //     attendees: attendees.length,
      //     meeting_length: count,
      //     cost: cost
      //   }
      // })
        // console.log(attendeesIds, meeting)
        // props.dispatch(updateRecentMeeting(meeting))
        props.dispatch(addMeetingAction(meeting, attendeesIds))
      
    }
    // console.log(meeting)
  

	return (
		<div className="container">
      <br></br>
			<ul>
				{props.users.map((u) => {
					return (
						<li key={u.id}>
							<input type="checkbox" onClick={() => checkBoxHandler(u)}></input>
							{u.username} ({u.first_name} {u.last_name}) 
						</li>
					)
				})}
			</ul>
      <form onSubmit={handleFormSubmit}>
      <br></br>
        <label> Meeting Name
          <input type='text' name='meeting_name' placeholder='meeting name'> 
          </input>
          <br></br>
          <br></br>
          <button>
            set meeting name
          </button>
          <br></br>
          <br></br>
        </label>
      </form>
     {formData != '' &&  <div>
       <p>Meeting Name: {formData}</p>
       <br></br>
     {buttonStart ? (
      <button onClick={handleButtonChange}>Start Meeting</button>
    ) : (
      <button onClick={sendToHistory}>
        <Link to="/history">Stop Meeting</Link></button>
    )}
    <br></br>
    <br></br>
    <p>Time Elapsed: {count}</p>
    <p>Cost: ${Number(cost).toFixed(2)}</p> </div>
     } 
			
		</div>
	)
}

const mapStateToProps = (globalState) => {
	return {
		user: globalState.auth.user,
    users: globalState.users,
    
	}
}

export default connect(mapStateToProps)(Meeting)
