import React, { useState, useContext } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import MainContext from '../providers/MainContext'
import { parsedCurrentDate, tYear, daysInMonth } from './components/calendar/dateFunctions'
import * as CMF from './moduleFunctions/calendarModuleFunctions'
import _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const CalendarModule = ({nonLoad}) => {
  const p = useContext(MainContext)
  const [selectedDay, updateSelectedDay] = useState(null)
  const [currentItems, updateCurrentItems] = useState(null)
  const [yearlyItems, updateYearlyItems] = useState(null)
  const [calLoaded, updateCalLoaded] = useState(false)
  
  let noLiquBal = 0 // not liquid
  let totalBal = 0 // total
  p.accounts.forEach(a => {
    if(!a.liquid){
      noLiquBal = noLiquBal + parseFloat(a.amount)
    }
    totalBal = totalBal + parseFloat(a.amount)
  }) 

  const s = { // common styles
    h:  { margin: '0', padding: '0', marginTop: '20px' }, // head
    r:  { margin: '0', padding: '0' }, // reset
    ri: { width: '49%', textAlign: 'right'}, // right
    dt: { fontSize: '1.2rem' }, // date
    mn: { fontSize: '.8rem', paddingTop: '4px' }, // money
    lstDate: {fontSize: '.8rem', display: 'block', paddingTop: '10px', fontWeight: 'normal', color: '#b2b2b2'}
  }
  
  const tabContent = [
    { tab: 'Current month', content: CMF.genTabContent(currentItems, (totalBal - noLiquBal), 'Overview', s, totalBal) },
    { tab: 'Year', content: CMF.genTabContent(yearlyItems, (totalBal - noLiquBal), 'Yearly summary', s, totalBal, p.saveState, p.eoyTotal, p.eoyLiquid, (selectedDay || 'current')) }
  ]

  const procUpdateDate = (data) => {
     data.new && updateSelectedDay(data.new) 
     updateCurrentItems(data.items) 
  }
  
  const procUpdateYearItems = (data) => {
    if(!_.isEqual(data.items, yearlyItems)) {
      updateCalLoaded(false)
      updateYearlyItems(data.items)
    }
  }
  
  const selYear = selectedDay && selectedDay.y ? selectedDay.y : tYear()
  const endRangeDate = `12-${daysInMonth(12, selYear)}-${selYear}`
  const rangeDate = {start: parsedCurrentDate(), end: endRangeDate}

  return (
    <ContentBox title='Calendar' itemId='calendarModule' icon={<FontAwesomeIcon icon={faCalendar}/>} exClass={nonLoad ? 'hide' : ''}>
      <div className='row between mt-40'>
        <div className='smPlus mt-40 fw-b'>
          <TabbedView
            rounded
            activeColor={'#d9d9d9'}
            tabContent={tabContent}
          />
        </div>
        <Calendar
          items={[...CMF.convertToArray(p.budget), ...CMF.convertToArray(p.incomeSources)]}
          targetMonth={selectedDay && selectedDay.m ? selectedDay.m : null}
          targetYear={selectedDay && selectedDay.y ? selectedDay.y : null}
          className='lg'
          returnItems
          rangeDate = {rangeDate}
          onRangeChange = {p => procUpdateYearItems(p)}
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
