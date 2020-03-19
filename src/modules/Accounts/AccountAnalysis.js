import React, {useEffect, useState} from 'react'
import LineChart from 'react-linechart';
import { parsedCurrentDate } from '../components/calendar/dateFunctions'
import { calcMoney } from '../../utilities/convert';

const AccountAnalysis = ({ account }) => {
  const [parentWidth, updateParentWidth] = useState(800)

  const getWidth = () => {
    const cc = document.getElementById('accountsModule')
    cc && updateParentWidth(cc.offsetWidth - 30)
  }
  useEffect(() => { 
    getWidth()
    window.addEventListener('resize', getWidth)
    return function(){window.removeEventListener('resize', getWidth)}
  })

  const makeChart = () => { console.log(account)
    const years = 10
    const months = years * 12
    const showPoint = 12 // months
    const budgetItem = account.budgetItem
    const currentDate = parsedCurrentDate().split('-')
    let trackDate = currentDate.map(d => parseInt(d))

    let points = []
    let i = 0
    let trackAmount = account.amount
    const addOnFirstMonth = false // current day less than item day 
    if(addOnFirstMonth){
      trackAmount = calcMoney(trackAmount, budgetItem.amount)
    }
    while(i < months){
      let addAmount = budgetItem.noEnd === 'on' // || (account.budgetItem.end && account.budgetItem.end <= currentDate)
      if(addAmount){
        trackAmount = calcMoney(trackAmount, budgetItem.amount)
      }
      let interest = (trackAmount * parseFloat(account.interest)) / 12
      trackAmount = calcMoney(trackAmount, interest)
      if(showPoint % i === 0){
        points.push({ 
          x: trackDate[2] + i,
          y: parseFloat(trackAmount)
        })
      }
      i++
    }

    return(
      <LineChart
        hideXLabel
        hideYLabel
        yMin='100'
        width={parentWidth}
        height={500}
        data={[{color: 'green', points}]}
      />
    )
  }


  return(
    <div className='chartContainer' style={{width: '100%'}}>
      { makeChart() }
    </div>
  )
}

export default AccountAnalysis