import React, { useContext } from 'react'
import MainContext from '../../providers/MainContext'
import SoftList from '../interface/SoftList'
import { money, calcMoney } from '../../utilities/convert'
import ContentBox from '../interface/ContentBox'
import { up } from '../../utilities/convert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamation, faAmbulance } from "@fortawesome/free-solid-svg-icons";
import CalcSavingsNeeded from './functions'

const EmergencyFunds = () => {
  const p = useContext(MainContext)
  const {totalAvailable, livingExpenses, excluded, availableAmount} = CalcSavingsNeeded(p.total, p.budget, p.accounts)
  const creditDebt = p.accounts.reduce((p, c) => c.accountType === 'Credit' ? parseFloat(c.amount) + p : p , 0)
  const useTotalAvailable = calcMoney(totalAvailable, creditDebt, 'subtract')
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
          <div className='tt'>
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
              <li><strong>Credit debt</strong>
                <span style={{color: 'red'}}>
                  -{ money(creditDebt) }
                </span>
              </li>
            </SoftList>
            
              {
                (useTotalAvailable >= livingExpenses * 3 ) ? 
                  <div className='green icon-box mt-40 mb-10'>
                    <span><FontAwesomeIcon icon={faCheckCircle} /></span>
                    <p>It looks like you have enough to cover at least 3 months of emergency expenses.</p>
                  </div>
  
              : <div className='red icon-box mt-40 mb-10'>
                  <span><FontAwesomeIcon icon={faExclamation} /> </span>
                  <p> It looks like you need at least { money(calcMoney(livingExpenses * 3, useTotalAvailable, 'subtract')) } more to cover 3 months of emergency expenses.</p>
                </div>
              }
    
          </div>
        </div>
      </div>
    </ContentBox>
  )
}

export default EmergencyFunds
