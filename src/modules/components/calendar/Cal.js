import React from 'react'
import * as DF from './dateFunctions'
import { filledArray } from './utilities'
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
  updateDateInfo = newDate => this.setState({dateInfo: newDate})
  updateLoaded = isLoaded => this.setState({loaded: isLoaded})

  handleClick = (callBack, data, endDate, startDate) => {
    const {returnItems} = this.props
    const {dateInfo, eventInfo} = this.state

    if (returnItems) { // collect items to return
      data.items = []
      const pushData = (dataItems, itemDate) => dataItems.forEach(it => data.items.push({ ...it, itemDate }))
      // get current day
      const currDate = new Date()
      let safety = 0

      let testDate = startDate  || `${currDate.getMonth() + 1}-${currDate.getDate()}-${currDate.getFullYear()}`
      endDate = endDate || `${dateInfo.m}-${DF.daysInMonth(dateInfo.m, dateInfo.y)}-${dateInfo.y}`
      if(new Date(endDate) < new Date(startDate)) return callBack(data)
      while (safety < 6000) {
        const splDate = testDate.split('-')
        if (eventInfo[splDate[2]]) {
          let t = eventInfo[splDate[2]]
          if (t[splDate[0]]) {
            t = t[splDate[0]]
            if (t[splDate[1]]) pushData(t[splDate[1]], testDate)
          }
        }

        safety = safety + 1
        const stDate = DF.stepDate(splDate, 'daily')
        testDate = stDate.join('-')
        if (testDate === endDate) safety = 5999
      }
    }
    callBack(data) 
  }

  processItems = () => {
    const {items, onLoad, loaded, onRangeChange, rangeDate} = this.props
    const processedItems = {}
    items.forEach(it => {
      const prDate = new Date(it.date)
      if (it.rec) {
        let loopProtect = 0
        let dateTarg = prDate
        let calcDate = it.date
        while (dateTarg <= new Date(it.end)) {
          const newDate = calcDate.split('-').map(d => parseInt(d))
          if (!processedItems[newDate[2]]) processedItems[newDate[2]] = {}
          let targ = processedItems[newDate[2]]
          if (!targ[newDate[0]]) targ[newDate[0]] = {}
          targ = targ[newDate[0]]
          let checkDay = newDate[1]
          if (checkDay > DF.daysInMonth(newDate[0], newDate[2])) checkDay = DF.daysInMonth(newDate[0], newDate[2])
          if (!targ[checkDay]) targ[checkDay] = []
          const newItem = {
            ...it,
            item: it.item,
            color: it.color ? it.color : null,
          }
          targ[checkDay].push(newItem)

          const getNewDate = DF.stepDate(newDate, it.rec)

          calcDate = getNewDate.join('-')
          dateTarg = new Date(calcDate)
          loopProtect++
          if (loopProtect === 9000) break
        }
      } else {
        // Single date items
        if (!processedItems[prDate.getFullYear()]) processedItems[prDate.getFullYear()] = {}
        let targ = processedItems[prDate.getFullYear()]
        if (!targ[prDate.getMonth() + 1]) targ[prDate.getMonth() + 1] = {}
        targ = targ[prDate.getMonth() + 1]
        if (!targ[prDate.getDate()]) targ[prDate.getDate()] = []
        const newItem = {
          item: it.item,
          color: it.color ? it.color : null
        }
        targ[prDate.getDate()].push(newItem)
      }
    })
    this.setState({ eventInfo: processedItems}, () => {
      onLoad && !loaded && this.handleClick(onLoad, {old: this.state.dateInfo})
      if(!loaded && onRangeChange){
        this.handleClick(onRangeChange, {}, rangeDate.end, rangeDate.start)
      }
    })
  }

  changeMonth = dir => {
    const { dateInfo } = this.state
    const { clickNext, clickPrev } = this.props
    let nMonth = dateInfo.m
    const oldDate = { ...dateInfo }
    nMonth = dir === 'next' ? nMonth + 1 : nMonth - 1
    let nYear = dateInfo.y
    if (nMonth > 12) {
      nMonth = 1
      nYear = nYear + 1
    }
    if (nMonth < 1) {
      nMonth = 12
      nYear = nYear - 1
    }
    const newDate = { m: nMonth, y: nYear }
    this.updateDateInfo(newDate)
    const handler = dir === 'next' ? clickNext : clickPrev
    this.handleClick(
      handler, 
      { old: oldDate, new: newDate }, 
      `${newDate.m}-${DF.daysInMonth(newDate.m, newDate.y)}-${newDate.y}`
    )
  }
  renderCalender = () => {
    const { dateInfo, eventInfo } = this.state
    const { clickDay, clickEvent } = this.props
    const { handleClick } = this

    const tMonthDays = DF.daysInMonth(dateInfo.m, dateInfo.y)
    const tMonthStart = DF.monthStartOn(dateInfo.m, dateInfo.y)
    const toDate = new Date()
    const td = toDate.getMonth() + 1 + '-' + toDate.getDate() + '-' + toDate.getFullYear() 

    const weekDays = DF.Days.map(d => (<span key={d} className='weekDay'> <p>{d}</p> </span>))
    let track = false
    let dayTrack = 1
    const maxDays = [...filledArray(42)]
    const rootCal = maxDays.map((d, i) => {
      const iterDate = `${dateInfo.m}-${dayTrack}-${dateInfo.y}`
      const dt = dayTrack
      track = (track || tMonthStart === DF.Days[i]) && dayTrack <= tMonthDays
      const thisDay = (
        <span
          key={i}
          className={`${track && 'days'} ${iterDate === td && 'today'}`}
          onClick={() => clickDay && handleClick(clickDay, { new: { ...dateInfo }, d: dt })}
        >
          {track && dayTrack <= tMonthDays && (
            <p className='dayNum'>{dayTrack}</p>
          )}
          {track && eventInfo &&
            eventInfo[dateInfo.y] &&
            eventInfo[dateInfo.y][dateInfo.m] &&
            eventInfo[dateInfo.y][dateInfo.m][dayTrack] &&
            eventInfo[dateInfo.y][dateInfo.m][dayTrack].map((d, i) => {
              const dt = dayTrack
              return (
                <p
                  key={i}
                  className={`eventItem ${new Date(iterDate) < toDate && 'pastEvent'}`}
                  style={{ borderColor: d.color ? d.color : null }}
                  onClick={e => {
                    e.stopPropagation()
                    clickEvent && handleClick(clickEvent, { event: d.item, new: { ...dateInfo }, d: dt })
                  }
                  }
                >
                  {d.item}
                </p>)
            })}
        </span>
      )
      track && dayTrack++
      return thisDay
    })
    return (
      <>
        {weekDays}
        {rootCal}
      </>
    )
  }

  render(){
    const { dateInfo } = this.state
    const { clickThisDate } = this.props
    const { handleClick, changeMonth, updateDateInfo } = this 
    return (
      <div id='calendar'>
        <div className='cal-controls'>
          <div className='dayMonth'>{DF.Months[dateInfo.m - 1]} - {dateInfo.y}</div>
          <div>
            {((dateInfo.y !== DF.tYear()) || (dateInfo.m !== DF.tMonth())) &&
            <>
              <button onClick={() => {
                const newDate = { m: DF.tMonth(), y: DF.tYear() }
                clickThisDate && handleClick(
                  clickThisDate, 
                  { new: newDate, old: dateInfo },
                  `${newDate.m}-${DF.daysInMonth(newDate.m, newDate.y)}-${newDate.y}`
                  )
                updateDateInfo(newDate)
              }}
              > This date
              </button> &nbsp;&nbsp;|
            </>}
            <button onClick={() => changeMonth('prev')}>Prev Month</button>
            <button onClick={() => changeMonth('next')}>Next Month</button>
          </div>
        </div>
        <div className='allDays'>
          {this.renderCalender()}
        </div>
      </div>
    )
  }

}

export default Cal
