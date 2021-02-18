import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { fetchUsers } from '../actions/meeting'

function Meeting(props) {
	const [count, setCount] = useState(0)
  const [buttonStart, setButtonStart] = useState(true)
  const [attendees, setAttendees] = useState([])
  const [cost, setCost] = useState(0)
  const [redirect, setRedirect] = useState(false)
  const [formData, setFormData] = useState('')


	useEffect(() => {
		let interval = null
		if (!buttonStart) {
    let avgCost = 0
    attendees.map(attendee => {
      avgCost += attendee.hourly_wage 
      return null
    })
    avgCost = avgCost / 3600
    console.log(cost)
			interval = setInterval(() => {
        setCount((count) => count + 1)
        setCost(newCost => newCost + avgCost)
			}, 1000)
		} else {
      console.log('cheese')
      clearInterval(interval)
      setRedirect(true)
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

  const handleInputChange = () => {


  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormData(e.target.meeting_name.value)
    e.target.meeting_name.value = ''
  }

  const sendToHistory = () => {
  }

	return (
		<div className="container">
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
        <label> Meeting Name
          <input type='text' name='meeting_name' placeholder='meeting name' onChange={handleInputChange}> 
          </input>
          <button>
            set meeting name
          </button>
        </label>
      </form>
     {formData != '' &&  <p>Meeting Name: {formData}</p>}
			{buttonStart ? (
				<button onClick={handleButtonChange}>Start Meeting</button>
			) : (
				<button onClick={sendToHistory}><Link to='/history'>Stop Meeting</Link></button>
			)}
			<p>{count}</p>
      <p>${cost.toFixed(2)}</p>
      {/* {redirect && <Redirect to='/history'/>} */}
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
