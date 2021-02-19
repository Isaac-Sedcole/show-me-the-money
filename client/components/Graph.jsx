import React, { useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import { connect } from 'react-redux'
import { fetchMeetings } from '../actions/meeting'

const Graph = (props) => {

  useEffect(() => {
    props.dispatch(fetchMeetings())
  }, [])

  const data = props.meetings.map(meeting => {
    meeting.name_date = meeting.meeting_name + '(' + String(meeting.time) + ')'
    console.log(meeting.name_date)
    return {
      name_date: meeting.name_date,
      cost: meeting.cost
    }
  })
  

  // const data = [
  //   {name: 'first-meeting', cost: 300},
  //   {name: 'second-meeting', cost: 350},
  //   {name: 'thrid-meeting', cost: 200}
  // ]

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="cost" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name_date" />
      <YAxis />
    </LineChart>
  )

}

const mapStateToProps = (globalState) => {
  return {
    meetings: globalState.meetings
  }
}

export default connect(mapStateToProps)(Graph)
