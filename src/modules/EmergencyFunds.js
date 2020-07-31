import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import SoftList from './interface/SoftList'
import { money, calcMoney } from '../utilities/convert'
import ContentBox from './interface/ContentBox'
import { up } from '../utilities/convert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamation, faAmbulance } from "@fortawesome/free-solid-svg-icons";

const EmergencyFunds = () => {
  const p = useContext(MainContext)

  let livingExpenses = p.total
  const excluded = {}
  let towardEmergency = []
  

  Object.keys(p.budget).forEach(b => { // If savings account, exclude from calculation
    if (b && (b.toLowerCase().includes('saving') || b.toLowerCase().includes('save'))) {
      excluded[b] = p.budget[b]
      livingExpenses = livingExpenses - parseFloat(p.budget[b].total)
    }
  })

  for(const account in p.accounts){
    const acc = p.accounts[account]
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

  return (
    <ContentBox title='Emergency Funds' itemId='emergencyFundsModule' icon={<FontAwesomeIcon icon={faAmbulance} />}>
      <div className='row mt-40'>
        <p className='remark' style={{minWidth: '150px', width: '80%'}}>
          Having an emergency fund is an important part of financial independence.
          Be adequately prepared for unforeseen circumstances by saving at least 3 to 6 
          months of monthly expenses.
        </p>
        <div className='max row'>
          <div className='thr'>
            <SoftList split>
              <li className='t-blue'><strong>Amount available</strong> <span>{money(totalAvailable)}</span></li>
              { availableAmount }
            </SoftList>
          </div>
          <div className='m-lg'>
            <SoftList split>
              <li><strong>Monthly expenditure</strong><span>{money(p.total)}</span></li>
              {Object.keys(excluded).map(b =>
                <li key={b}><strong>{up(b)}</strong> <span>-{money(excluded[b].total)}</span></li>)
              }
              <li><strong>Monthly living expenses</strong>{money(livingExpenses)} </li>
              <li className='t-green'>
                <strong>Target emergency funds</strong>
                {money(livingExpenses * 3)} - {money(livingExpenses * 6)}
              </li>
            </SoftList>
            
              {
                (totalAvailable >= livingExpenses * 3 ) ? 
                  <div className='green icon-box mt-40 mb-10'>
                    <span><FontAwesomeIcon icon={faCheckCircle} /></span>
                    <p>It looks like you have enough to cover at least 3 months of emergency expenses.</p>
                  </div>
  
              : <div className='red icon-box mt-40 mb-10'>
                  <span><FontAwesomeIcon icon={faExclamation} /> </span>
                  <p> It looks like you need at least { money(calcMoney(livingExpenses * 3, totalAvailable, 'subtract')) } more to cover 3 months of emergency expenses.</p>
                </div>
              }
    
          </div>
        </div>
      </div>
    </ContentBox>
  )
}

export default EmergencyFunds
