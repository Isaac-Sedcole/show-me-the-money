import React from 'react'
import { connect } from 'react-redux'


function History () {
  return <div className="container">
    <h2 className="title is-2">Meeting history</h2>
  </div>
}

const mapStateToProps = (globalState) => {
  return {
    meetings: globalState.meetings
  }
}

export default connect(mapStateToProps)(History)
