import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import SoftList from './interface/SoftList'
import {money} from '../utilities/convert'
import ContentBox from './interface/ContentBox'
 
const EmergencyFunds = () => {
    const p = useContext(MainContext)

    let livingExpenses = p.total
    let excluded = {}

    Object.keys(p.budget).forEach(b => {
        if(b && (b.toLowerCase().includes('saving') || b.toLowerCase().includes('save')) ){
            excluded[b] = p.budget[b]
            livingExpenses = livingExpenses - parseFloat(p.budget[b].total)
        }
    })

    return(
        <ContentBox title="Emergency Funds" exClass='lg'>
        <div className='row mt-40'>
          <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className='lg'>
           <SoftList split>
                <li><strong>Monthly expenditure</strong><span>{ money(p.total)}</span></li>
                { Object.keys(excluded).map(b => <li key={b}><strong>{b}</strong> <span>-{money(excluded[b].total)}</span></li>) } 
                <li><strong>Monthly living living expenses</strong>{money(livingExpenses)} </li>
                <li><strong>Target emergency funds</strong>{money(livingExpenses * 3)} </li>
            </SoftList>
          </div>
        </div>
      </ContentBox>
    )
}

export default EmergencyFunds