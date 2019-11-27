import React from 'react'
import * as DF from './dateFunctions'
import CF from './calFunctions'
import _ from 'lodash'

class Cal extends React.Component {
  constructor(){
    super()
    this.state = {
      rangeDate: {start: "", end: ""},
      eventInfo: {},
      dateInfo: {
        m: null,
        y: null
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
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
    <button 
      className='thisDateBtn'
      onClick={() => {
        const newDate = { m: DF.tMonth(), y: DF.tYear() }
        clickThisDate && handleClick( clickThisDate, { new: newDate, old: dateInfo }, `${newDate.m}-${DF.daysInMonth(newDate.m, newDate.y)}-${newDate.y}` )
        updateDateInfo(newDate)
      }} > This date 
    </button>
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
    const {onRangeChange, rangeDate, items, loaded, onLoad, loadRange} = this.props
    const ST = {...this.state}
    const newState = {} 

    const targetMonth = this.props.targetMonth ? this.props.targetMonth : DF.tMonth()
    const targetYear = this.props.targetYear ? this.props.targetYear : DF.tYear()

    const dateChanged = (targetYear !== ST.dateInfo.y, targetMonth !== ST.dateInfo.m)
    const rangeChanged = (rangeDate.end !== ST.rangeDate.end || rangeDate.start !== ST.rangeDate.start)
    if(onRangeChange && rangeChanged) newState.rangeDate = {start: rangeDate.start, end: rangeDate.end}

    const itemsNew = this.processItems(items, loadRange.start, loadRange.end) 
    if(!_.isEqual(itemsNew, ST.eventInfo)) newState.eventInfo = itemsNew 
    if(dateChanged) newState.dateInfo = { m: targetMonth, y: targetYear }

    Object.keys(newState).length > 0 && this.setState(newState, () => {
      rangeChanged && onRangeChange && this.handleClick(onRangeChange, {}, `12-${DF.daysInMonth(12, rangeDate.end.split('-')[2])}-${rangeDate.end.split("-")[2]}`, rangeDate.start)
      !loaded && onLoad && this.handleClick(onLoad, {old: this.state.dateInfo})
    })
    
  }
}

export default Cal
