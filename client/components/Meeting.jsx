import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import {}

function Meeting(props) {
  const [count, setCount] = useState(0)
  const [buttonStart, setButtonStart] = useState(true)

	useEffect(() => {
    let interval = null
    if(!buttonStart){
      interval = setInterval(() => {
        setCount(count => count + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [buttonStart, count])

  useEffect(() => {
    //loadstuff(users)
  },[])
  
	const handleButtonChange = (e) => {
    setButtonStart(!buttonStart)
    
	}

	return (
		<div className="container">
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
	}
}

export default connect(mapStateToProps)(Meeting)
