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
      <h1>Meeting History</h1>
      <button onClick={handleGraphClick}>
          { !showingGraph ? "$how me the Graph-y" :
          "$how me the list-y" } 
      </button>
      <ul>
        { showingGraph ? <Graph /> : 
          meetings.reverse().map(meeting => {
          return (
            <li key={meeting.id}>
              <MeetingInfo meetingLocal={meeting}/>
            </li>
          )
        })}
      </ul>
    </div>
  ) 
}

const mapStateToProps = (globalState) => {
  return {
    meetings: globalState.meetings
  }
}

export default connect(mapStateToProps)(Histories)