import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/meeting'

function Meeting(props) {
	const [count, setCount] = useState(0)
  const [buttonStart, setButtonStart] = useState(true)
  const [attendees, setAttendees] = useState([])
  const [cost, setCost] = useState(0)


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
			{buttonStart ? (
				<button onClick={handleButtonChange}>Start Meeting</button>
			) : (
				<button onClick={handleButtonChange}>Stop Meeting</button>
			)}
			<p>{count}</p>
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
