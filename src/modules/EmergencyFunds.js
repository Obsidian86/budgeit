import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import SoftList from './interface/SoftList'
import { money } from '../utilities/convert'
import ContentBox from './interface/ContentBox'
import { up } from '../utilities/convert'

const EmergencyFunds = () => {
  const p = useContext(MainContext)

  let livingExpenses = p.total
  const excluded = {}

  Object.keys(p.budget).forEach(b => {
    if (b && (b.toLowerCase().includes('saving') || b.toLowerCase().includes('save'))) {
      excluded[b] = p.budget[b]
      livingExpenses = livingExpenses - parseFloat(p.budget[b].total)
    }
  })

  return (
    <ContentBox title='Emergency Funds' exClass='md'>
      <div className='row mt-40'>
        <p className='sm'>
          Having an emergency fund is an important part of financial independence.
          Be adequately prepared for unforeseen circumstances by saving at least 3
          months of monthly expenses.
        </p>
        <div className='lg'>
          <SoftList split>
            <li><strong>Monthly expenditure</strong><span>{money(p.total)}</span></li>
            {Object.keys(excluded).map(b =>
              <li key={b}><strong>{up(b)}</strong> <span>-{money(excluded[b].total)}</span></li>)
            }
            <li><strong>Monthly living expenses</strong>{money(livingExpenses)} </li>
            <li><strong>Target emergency funds</strong>{money(livingExpenses * 3)} </li>
          </SoftList>
        </div>
      </div>
    </ContentBox>
  )
}

export default EmergencyFunds
