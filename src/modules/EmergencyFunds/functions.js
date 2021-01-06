import React from 'react'
import { calcMoney, up, money } from '../../utilities/convert'

export default (total, budget, accounts) => {
  let livingExpenses = total
  const excluded = {}
  let towardEmergency = []

  Object.keys(budget).forEach(b => { // If savings account, exclude from calculation
    if (b && (b.toLowerCase().includes('saving') || b.toLowerCase().includes('save'))) {
      excluded[b] = budget[b]
      livingExpenses = livingExpenses - parseFloat(budget[b].total)
    }
  })

  for(const account in accounts){
    const acc = accounts[account]
    if( acc.liquid ){
      towardEmergency.push(acc)
    } 
  }
  
  let totalAvailable = 0
  const availableAmount = towardEmergency.map((acc, ind) =>{
      totalAvailable = calcMoney(totalAvailable, acc.amount)
      return (<li key={ind}>
        <strong>{up(acc.name)}</strong>
        <span>{money(acc.amount)}</span>
      </li>)
    })

    return ({
        totalAvailable,
        livingExpenses,
        availableAmount,
        excluded
    })
}