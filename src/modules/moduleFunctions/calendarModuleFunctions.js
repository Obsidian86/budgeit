import React, { Fragment as Fr } from 'react'
import { Months } from '../components/calendar/dateFunctions'
import { money } from '../../utilities/convert'
import SoftList from '../interface/SoftList'
import Scroll from '../interface/Scroll'

export const genTabContent = (procItems, trackBalance, title, s) => {
    
    if(!Array.isArray(procItems)) return <>title</>

    let yearTrack = ''
    let monthTrack = ''
      return <>
        <h2 style={s.h}>{title}</h2>
        <p style={s.r}>{ money(trackBalance)}</p>
        <Scroll height={600}>
          <SoftList split>
            {procItems && procItems.map((ci, i) => {
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
              } else{
                if(ci.amount) trackBalance = trackBalance - parseFloat(ci.amount)
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
  }

  // turn budget into readable calendar readable array
  export const convertToArray = (categorized) => {
    let bArray = []
    Object.keys(categorized).map(it => bArray = [...bArray, ...categorized[it].items])
    return bArray
  }