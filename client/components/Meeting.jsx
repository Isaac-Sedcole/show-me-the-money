import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/meeting'

function Meeting(props) {
	const [count, setCount] = useState(0)
	const [buttonStart, setButtonStart] = useState(true)

	useEffect(() => {
		let interval = null
		if (!buttonStart) {
			interval = setInterval(() => {
				setCount((count) => count + 1)
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
  
  const checkBoxHandler = () => {
    
  }

	return (
		<div className="container">
			<ul>
				{props.users.map((u) => {
					return (
						<li key={u.id}>
							<input type="checkbox" onClick={checkBoxHandler}></input>
							{u.first_name} {u.last_name}
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
			{/* <p>{props.user.last_name}</p> */}
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
