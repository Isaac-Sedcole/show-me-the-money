import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMeetings } from '../actions/meeting'

function History(props) {
	useEffect(() => {
    props.dispatch(fetchMeetings())
  }, [])

	return (
		<div className="container">
			<h2 className="title is-2">Meeting history</h2>
		</div>
	)
}

const mapStateToProps = (globalState) => {
	return {
		meetings: globalState.meetings,
	}
}

export default connect(mapStateToProps)(History)
