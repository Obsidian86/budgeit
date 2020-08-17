import React, { Fragment as Fr } from 'react'
import { Months, tYear } from '../components/calendar/dateFunctions'
import { money, calcMoney } from '../../utilities/convert'
import SoftList from '../interface/SoftList'
import Scroll from '../interface/Scroll'


export const genTabContent = (procItems, trackBalance, title, s, balWithLiquid, saveState, eoyTotal, eoyLiquid, selectedDay, accounts) => {
    let EOYtrackBalance = trackBalance
    let EOYbalWithLiquid = balWithLiquid
    let retItems
    if(!Array.isArray(procItems) || procItems.length === 0){
      retItems = <>
        <div className='row mt-40'>
          <p style={{...s.r, color: 'green'}}>Liquid { money(trackBalance)}</p>
          <p style={s.r}>Total { money(balWithLiquid)}</p>
        </div>
        <p className='mt-20 mb-20'> No items to view for this range </p>
      </>
    }else{
      let yearTrack = ''
      let monthTrack = ''
        retItems = <>
          <h2 style={s.h}>{title}</h2>
          <div className='row mt-10'>
            <p style={{...s.r, color: 'green'}}>Liquid { money(trackBalance)}</p>
            <p style={s.r}>Total { money(balWithLiquid)}</p>
          </div>
          <Scroll height={600}>
            <SoftList split>
              {procItems && procItems.map((ci, i) => {
                const iDate = ci.itemDate.split('-')
                let showDate = false
                const keepBalance = trackBalance
                const isAccountTransfer = ci.toAccount && ci.toAccount !== '' 
                  && ci.fromAccount && ci.fromAccount !== '' 
                  && ci.itemClass === 'cal-transfer'

                if (iDate[2] !== yearTrack || iDate[0] !== monthTrack) {
                  showDate = true
                  yearTrack = iDate[2]
                  monthTrack = iDate[0]
                }
                // INCOME
                if(!isAccountTransfer && ci.category && ci.amount && ci.category.toLowerCase() === 'income'){
                  trackBalance = calcMoney(trackBalance, ci.amount)
                  balWithLiquid = calcMoney(balWithLiquid, ci.amount)
                  if(parseInt(yearTrack) === tYear()){
                    EOYtrackBalance = calcMoney(EOYtrackBalance, ci.amount)
                    EOYbalWithLiquid = calcMoney(EOYbalWithLiquid, ci.amount)
                  }
                } else{
                  // BUDGET ITEM
                  if(!isAccountTransfer && ci.amount && ci.isTransfer !== 'on'){
                    trackBalance = calcMoney(trackBalance, ci.amount, 'subtract') 
                    balWithLiquid = calcMoney(balWithLiquid, ci.amount, 'subtract')
                    if(parseInt(yearTrack) === tYear()){
                      EOYtrackBalance = calcMoney(EOYtrackBalance, ci.amount, 'subtract')
                      EOYbalWithLiquid = calcMoney(EOYbalWithLiquid, ci.amount, 'subtract')
                    }
                  }
                  // Handle account transfers
                  if(accounts && isAccountTransfer){
                    let fromAcc = accounts.filter(a => a.id + '' === ci.fromAccount + '')
                    let toAcc = accounts.filter(a => a.id + '' === ci.toAccount + '')
                    if(fromAcc.length && toAcc.length){
                      fromAcc = fromAcc[0]
                      toAcc = toAcc[0]
                      if(fromAcc.liquid !== toAcc.liquid){
                        if(fromAcc.liquid && !toAcc.liquid){
                          trackBalance = calcMoney(trackBalance, ci.amount, 'subtract')
                          if(parseInt(yearTrack) === tYear()){
                            EOYtrackBalance = calcMoney(EOYtrackBalance, ci.amount, 'subtract')
                          }
                        }
                        if(!fromAcc.liquid && toAcc.liquid){
                          trackBalance = calcMoney(trackBalance, ci.amount)
                          if(parseInt(yearTrack) === tYear()){
                            EOYtrackBalance = calcMoney(EOYtrackBalance, ci.amount)
                          }
                        }
                      }
                    }
                  }
                }
                return (
                  <Fr key={i}>
                    {showDate && 
                      <li>
                        <span  style={s.dt}>{Months[iDate[0] - 1]} {iDate[2]}</span>
                        <span style={s.mn}>{money(keepBalance)}</span>
                      </li>}
                    <li style={{color: ci.color ? ci.color : 'gray', fontWeight: 'bold'}}>
                      <span style={{...s.ri, textAlign: 'left'}}>
                        {ci.item}<br />
                        <span style={s.lstDate}>{ci.itemDate}</span>
                      </span>
                      <span style={s.ri}>{ci.amount ? money(ci.amount) : ' '}</span>
                    </li>
                  </Fr>
                )
              }
              )}
            </SoftList>
          </Scroll>
          <div className='row'>
          <p style={{color: 'green'}}>Liquid { money(trackBalance) }</p>
          <p>Total { money(balWithLiquid) }</p>
          </div>
        </>
      }

      if(title === 'Yearly summary' && selectedDay && (selectedDay === 'current' || (selectedDay.y && selectedDay.y === tYear()))){
        if(eoyTotal !== EOYbalWithLiquid || eoyLiquid !== EOYtrackBalance){
          saveState({
            eoyLiquid: EOYtrackBalance,
            eoyTotal: EOYbalWithLiquid
          })
        }
      }
      return retItems
  }

  // turn budget into readable calendar readable array
  export const convertToArray = (categorized) => {
    let bArray = []
    if(Array.isArray(categorized)){
      bArray = [...categorized]
    }else{
      Object.keys(categorized).map(it => bArray = [...bArray, ...categorized[it].items])
    }
    for(const x in bArray){
      let iter = bArray[x]
      if(!iter.color){
        let isGreen = iter.category && iter.category.toLowerCase() === 'income'
        if(isGreen){
          iter.color = 'green';
        }else if(!isGreen && iter.amount && iter.isTransfer !== 'on'){
          iter.color = 'red'
        }else if(!isGreen && iter.amount && iter.isTransfer === 'on'){
          iter.color = 'lightblue'
        }else{
          iter.color = 'gray'
        }
      }
    }
    return bArray
  }