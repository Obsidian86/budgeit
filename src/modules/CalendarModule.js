import React, { useState, useContext, Fragment as Fr } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import MainContext from '../providers/MainContext'
import { Months, parsedCurrentDate, tYear, daysInMonth } from './components/calendar/dateFunctions'
import { money } from '../utilities/convert'
import SoftList from './interface/SoftList'
import Scroll from './interface/Scroll'

const CalendarModule = () => {
  const p = useContext(MainContext)
  const [selectedDay, updateSelectedDay] = useState(null)
  const [currentItems, updateCurrentItems] = useState(null)
  const [calLoaded, updateCalLoaded] = useState(false)

  // turn budget into readable calendar readable array
  const convertToArray = (categorized) => {
    let bArray = []
    Object.keys(categorized).map(it => bArray = [...bArray, ...p.budget[it].items])
    return bArray
  }

  let trackBalance = 0
  p.accounts.map(a => trackBalance = trackBalance + parseFloat(a.amount))

  const s = { // common styles
    h: {margin: '0', padding: '0', marginTop: '20px'}, // head
    r: {margin: '0', padding: '0'}, // reset
    ri: {width: '30%', textAlign: 'right'}, // right
    dt: { fontSize: '1.2rem' }, // date
    mn: { fontSize: '.8rem', paddingTop: '4px' } // money
  }

  let yearTrack = ''
  let monthTrack = ''
  const contentOne =
    <>
      <h2 style={s.h}> Overview </h2>
      <p style={s.r}>{ money(trackBalance)}</p>
      <Scroll height={600}>
        <SoftList split>
          {currentItems && currentItems.map((ci, i) => {
            const iDate = ci.itemDate.split('-')
            let showDate = false
            let withdrawl = true
            const keepBalance = trackBalance
            if (iDate[2] !== yearTrack || iDate[0] !== monthTrack) {
              showDate = true
              yearTrack = iDate[2]
              monthTrack = iDate[0]
            }
            if(ci.category.toLowerCase() === 'income'){
              trackBalance = trackBalance + parseFloat(ci.amount)
              withdrawl = false
            } else {
              trackBalance = trackBalance - parseFloat(ci.amount)
            }
            return (
              <Fr key={i}>
                {showDate && 
                  <li>
                    <span  style={s.dt}>{Months[iDate[0] - 1]} {iDate[2]}</span>
                    <span style={s.mn}>{money(keepBalance)}</span>
                  </li>}
                <li style={{color: withdrawl ? 'red' : 'green', fontWeight: 'bold'}}>
                  <span style={{...s.ri, textAlign: 'left'}}>{ci.item}</span>
                  <span style={s.ri}>{ci.itemDate}</span>
                  <span style={s.ri}>{money(ci.amount)}</span>
                </li>
              </Fr>
            )
          }
          )}
        </SoftList>
      </Scroll>
      <p>Ending balance { money(trackBalance) }</p>
    </>
  const contentTwo =
    <>
      <h2 style={s.h}> Year end summary </h2>
      <SoftList split />
    </>

  const procUpdateDate = (data) => {
    updateSelectedDay(data.new)
    updateCurrentItems(data.items)
  }

  const selYear = selectedDay && selectedDay.y ? selectedDay.y : tYear()
  const endRangeDate = `12-${daysInMonth(12, selYear)}-${selYear}`
  const rangeDate = {start: parsedCurrentDate(), end: endRangeDate}
  return (
    <ContentBox title='Calendar'>
      <div className='row'>
        <div className='sm mt-40'>
          <TabbedView
            rounded
            activeColor={'#d9d9d9'}
            tabContent={[
              { tab: 'Current month', content: contentOne },
              { tab: 'Year', content: contentTwo }
            ]}
          />
        </div>
        <Calendar
          items={[...convertToArray(p.budget), ...p.incomeSources]}
          targetMonth={selectedDay && selectedDay.m ? selectedDay.m : null}
          targetYear={selectedDay && selectedDay.y ? selectedDay.y : null}
          className='lg'
          returnItems
          rangeDate = {rangeDate}
          onRangeChange = {p => console.log(p)}
          loaded = {calLoaded}
          onLoad={p => {
            procUpdateDate(p)
            updateCalLoaded(true)
          }}
          clickNext={p => procUpdateDate(p)}
          clickPrev={p => procUpdateDate(p)}
          clickThisDate={p => procUpdateDate(p)}
        />
      </div>
    </ContentBox>
  )
}

export default CalendarModule
