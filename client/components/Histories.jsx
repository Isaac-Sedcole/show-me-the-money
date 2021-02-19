import React, { useEffect ,useState } from 'react'
import {connect} from 'react-redux'

import MeetingInfo from './MeetingInfo'
import { fetchMeetings } from '../actions/meeting'
import Graph from './Graph'

function Histories (props) {

  const [showingGraph, setShowingGraph] = useState(false)

  useEffect(() => {
    props.dispatch(fetchMeetings())
  },[])

  const handleGraphClick = () => {
    setShowingGraph(!showingGraph)
  }

  const meetings = props.meetings
  console.log(meetings)



  return (
    <div className='history-container'>
      <br></br>
      <h1>Meeting History</h1>
      <br></br>
      <button onClick={handleGraphClick}>
          { !showingGraph ? "$how me the Graph-y" :
          "$how me the list-y" } 
      </button>
      <br></br>
      <br></br>
      <ul>
        { showingGraph ? <Graph /> : 
          meetings.reverse().map(meeting => {
          return (
            <li key={meeting.id}>
              <MeetingInfo meetingLocal={meeting}/>
              <br></br>
            </li>
           
          )
        })}
      </ul>
      <br></br>
    </div>
  ) 
}

const mapStateToProps = (globalState) => {
  return {
    meetings: globalState.meetings
  }
}

export default connect(mapStateToProps)(Histories)