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
      currentItemCount: 0,
      dateInfo: {
        m: this.props.targetMonth || DF.tMonth(),
        y: this.props.targetYear || DF.tYear()
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => { 
    const {onRangeChange, rangeDate} = this.props
    if(onRangeChange && (rangeDate.end !== this.state.rangeDate.end || rangeDate.start !== this.state.rangeDate.start)){
      this.setState({rangeDate: {start: rangeDate.start, end: rangeDate.end}}, () => {
        this.handleClick(onRangeChange, {}, rangeDate.end, rangeDate.start)})
    }
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
  }

  componentDidMount = () => this.processItems()
  updateDateInfo = dateInfo => this.setState({dateInfo})
  updateLoaded = loaded => this.setState({loaded})

  handleClick = (callBack, data, end, date) => CF.handleClick(callBack, data, end, date, this.props, this.state)
  changeMonth = dir => CF.changeMonth(dir, this.updateDateInfo, this.handleClick, this.props, this.state)
  renderCalender = () => CF.renderCalendar(this.handleClick, this.props, this.state)

  processItems = () => {
    const {items, onLoad, loaded, onRangeChange, rangeDate} = this.props
    const eventInfo = CF.processItems(items)
    this.setState({ eventInfo }, () => {
      onLoad && !loaded && this.handleClick(onLoad, {old: this.state.dateInfo})
      if(!loaded && onRangeChange){
        this.handleClick(onRangeChange, {}, rangeDate.end, rangeDate.start)
      }
    })
  }


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
        <div className='allDays'> {this.renderCalender()} </div>
      </div>
    )
  }

}

export default Cal
