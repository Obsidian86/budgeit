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
import { money, calcMoney } from '../utilities/convert'

const CalendarModule = ({nonLoad}) => {
  const p = useContext(MainContext)
  const [selectedDay, updateSelectedDay] = useState(null)
  const [currentItems, updateCurrentItems] = useState(null)
  const [yearlyItems, updateYearlyItems] = useState(null)
  const [calLoaded, updateCalLoaded] = useState(false)
  
  let noLiquBal = 0 // not liquid
  let liquidBal = 0
  let totalBal = 0 // total
  p.accounts.forEach(a => {
    if (a.accountType === 'Credit') {
      totalBal = calcMoney(totalBal, a.amount, 'subtract')
    } else {
      if (a.liquid) liquidBal = liquidBal + parseFloat(a.amount)
      else noLiquBal = noLiquBal + parseFloat(a.amount)
      totalBal = totalBal + parseFloat(a.amount)
    }
  }) 

  const s = { // common styles
    h:  { margin: '0', padding: '0', marginTop: '20px' }, // head
    r:  { margin: '0', padding: '0' }, // reset
    ri: { width: '49%', textAlign: 'right'}, // right
    dt: { fontSize: '1.2rem' }, // date
    mn: { fontSize: '.8rem', paddingTop: '4px' }, // money
    lstDate: {
      fontSize: '.8rem', display: 'flex', paddingTop: '10px', 
      fontWeight: 'normal', color: '#b2b2b2', justifyContent: 'space-between', width: '100%'
    }
  }
  
  const tabContent = [
    { tab: 'Current month', 
      content: 
        CMF.genTabContent(
          currentItems,
          liquidBal,
          'Overview', s, totalBal,
          p.saveState,
          p.eoyTotal,
          p.eoyLiquid,
          (selectedDay || 'current'),
          p.accounts
        )
    },
    { 
      tab: 'Year', 
      content: 
        CMF.genTabContent(
          yearlyItems, 
          liquidBal,
          'Yearly summary', 
          s, 
          totalBal,
          p.saveState,
          p.eoyTotal, 
          p.eoyLiquid, 
          (selectedDay || 'current'),
          p.accounts
        )
    }
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

  const transfers = p.accountTransfers.map(at => {
    return ({
      ...at,
      date: at.date,
      rec: at.rec,
      color: 'blue',
      itemClass: 'cal-transfer',
      item: 'transfer ' + money(at.amount)
    })
  })

  return (
    <ContentBox
      title='Calendar'
      itemId='calendarModule'
      icon={<FontAwesomeIcon icon={faCalendar}/>}
      exClass={`new-content-box ${nonLoad ? 'hide' : ''}`}
    >
      <div className='row between mt-40'>
        <div className='w-30 mt-40 fw-b'>
          <TabbedView
            rounded
            activeColor={'#d9d9d9'}
            tabContent={tabContent}
          />
        </div>
        <Calendar
          items={[...CMF.convertToArray(p.budget), ...CMF.convertToArray(p.incomeSources), ...transfers ]}
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
