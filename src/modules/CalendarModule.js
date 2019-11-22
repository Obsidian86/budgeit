import React, { useState, useContext, Fragment as Fr } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import { b } from '../providers/tmpBg'
import MainContext from '../providers/MainContext'
import { Months } from './components/calendar/dateFunctions'
import { money } from '../utilities/convert'
import SoftList from './interface/SoftList'

const CalendarModule = () => {
  const p = useContext(MainContext)
  const [selectedDay, updateSelectedDay] = useState(null)
  const [currentItems, updateCurrentItems] = useState(null)

  const allItems = [...b, ...p.incomeSources]

  let yearTrack = ''
  let monthTrack = ''
  let trackBalance = 0
  p.accounts.forEach(a => {
    trackBalance = trackBalance + parseFloat(a.amount)
  })

  const hStyle = {
    marginBottom: '-13px',
    marginTop: '19px'
  }

  const contentOne =
    <>
      <h2 style={hStyle}> Overview </h2>
      <p style={{marginBottom: '-20px'}}>{ money(trackBalance)}</p>
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
                  <span  style={{ fontSize: '1.2rem' }}>{Months[iDate[0] - 1]} {iDate[2]}</span>
                  <span style={{ fontSize: '.8rem', paddingTop: '4px' }}>{money(keepBalance)}</span>
                </li>}
              <li style={{color: withdrawl ? 'red' : 'green', fontWeight: 'bold'}}>
                <span style={{width: '30%', textAlign: 'left'}}>{ci.item}</span>
                <span style={{width: '30%', textAlign: 'right'}}>{ci.itemDate}</span>
                <span style={{width: '30%', textAlign: 'right'}}>{money(ci.amount)}</span>
              </li>
            </Fr>
          )
        }
        )}
      </SoftList>
      <p>Ending balance { money(trackBalance) }</p>
    </>
  const contentTwo =
    <>
      <h2 style={hStyle}> Yearly Summary </h2>
      <SoftList split />
    </>

  const procUpdateDate = (data) => {
    updateSelectedDay(data.new)
    updateCurrentItems(data.items)
  }

  return (
    <ContentBox title='Calendar'>
      <div className='row'>
        <div className='sm'>
          <TabbedView
            activeColor={p.theme.vBlue}
            tabContent={[
              { tab: 'Current month', content: contentOne },
              { tab: 'Year', content: contentTwo }
            ]}
          />
        </div>
        <Calendar
          items={allItems}
          targetMonth={selectedDay && selectedDay.m ? selectedDay.m : null}
          targetYear={selectedDay && selectedDay.y ? selectedDay.y : null}
          className='lg'
          returnItems
          onLoad={p => console.log(p)}
          clickDay={p => procUpdateDate(p)}
          clickNext={p => procUpdateDate(p)}
          clickPrev={p => procUpdateDate(p)}
          clickThisDate={p => procUpdateDate(p)}
        />
      </div>
    </ContentBox>
  )
}

export default CalendarModule
