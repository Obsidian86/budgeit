import React from 'react'
import * as DF from '../dateFunctions'
import { filledArray } from '../utilities'

const renderCalender = (handleClick, props, state) => {
    const { dateInfo, eventInfo } = state
    const { clickDay, clickEvent } = props

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
                  className={`eventItem ${DF.pDate(iterDate) < toDate && 'pastEvent'}`}
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

  export default renderCalender