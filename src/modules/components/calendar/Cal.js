import React from 'react'
import * as DF from './dateFunctions'
import CF from './calFunctions'
import _ from 'lodash'

class Cal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rangeDate: {start: "", end: ""},
      eventInfo: {},
      procRange: {start: null, end: null},
      dateInfo: {
        m: null,
        y: null
      }
    }
  }

  updateDateInfo = dateInfo => this.setState({dateInfo})
  updateLoaded = loaded => this.setState({loaded})

  handleClick = (callBack, data, end, date) => CF.handleClick(callBack, data, end, date, this.props, this.state)
  changeMonth = dir => CF.changeMonth(dir, this.updateDateInfo, this.handleClick, this.props, this.state)
  renderCalender = () => CF.renderCalendar(this.handleClick, this.props, this.state)
  processItems = (items, startProc, endProc) => CF.processItems(items, startProc, endProc) 

  render(){
    const { dateInfo } = this.state
    const { clickThisDate } = this.props
    const { handleClick, changeMonth, updateDateInfo } = this 
    
    const thisMonthBtn = ((dateInfo.y !== DF.tYear()) || (dateInfo.m !== DF.tMonth())) ? 
    <>
    <button onClick={() => {
      const newDate = { m: DF.tMonth(), y: DF.tYear() }
        clickThisDate && handleClick( clickThisDate, { new: newDate, old: dateInfo }, `${newDate.m}-${DF.daysInMonth(newDate.m, newDate.y)}-${newDate.y}` )
        updateDateInfo(newDate)
      }} > This date 
    </button> &nbsp;&nbsp;| 
    </> : null

    return (
      <div id='calendar'>
        <div className='cal-controls'>
          <div className='dayMonth'>{DF.Months[dateInfo.m - 1]} - {dateInfo.y}</div>
          <div>
            { thisMonthBtn }
            <button onClick={() => changeMonth('prev')}>Prev Month</button>
            <button onClick={() => changeMonth('next')}>Next Month</button>
          </div>
        </div>
        <div className='allDays'> { this.renderCalender() } </div>
      </div>
    )
  }

  componentDidMount = () => {
    const {onRangeChange, rangeDate, items, loaded, onLoad} = this.props
    const ST = this.state
    const newState = {} 

    const targetMonth = this.props.targetMonth || DF.tMonth()
    const targetYear = this.props.targetYear || DF.tYear()

    const dateChanged = (targetYear !== ST.dateInfo.y, targetMonth !== ST.dateInfo.m)
    const rangeChanged = (rangeDate.end !== ST.rangeDate.end || rangeDate.start !== ST.rangeDate.start)
    if(onRangeChange && rangeChanged) newState.rangeDate = {start: rangeDate.start, end: rangeDate.end}

    const procChange = false
    let startProc = 2015
    let endProc = 2022

    // TODO
    //collect all dates
    const allDates = [
      rangeDate.start, rangeDate.end,
      ST.rangeDate.start, ST.rangeDate.end,
      ST.procRange.start, ST.procRange.end
    ]
    //compare to state dates

    console.log(allDates)

    const itemsNew = this.processItems(items, startProc, endProc) 
    if(!_.isEqual(itemsNew, ST.eventInfo)) newState.eventInfo = itemsNew 
    if(dateChanged) newState.dateInfo = { m: targetMonth, y: targetYear }
    if(procChange) newState.procRange = { start: startProc, end: endProc } 

    Object.keys(newState).length > 0 && this.setState(newState, () => {
      rangeChanged && onRangeChange && this.handleClick(onRangeChange, {}, `12-${DF.daysInMonth(12, rangeDate.end.split('-')[2])}-${rangeDate.end.split("-")[2]}`, rangeDate.start)
      !loaded && onLoad && this.handleClick(onLoad, {old: this.state.dateInfo})
    })
    
  }
}

export default Cal
