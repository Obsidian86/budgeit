import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import SoftList from './interface/SoftList'
import { money } from '../utilities/convert'
import { getInterest } from '../utilities/functions'


const s = {
    intRow: {
        width: '100%', 
        padding: '3px', 
        marginTop: '9px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    intFirst: {textAlign: 'left', width: '40%'}, 
    intRight: {textAlign: 'right', width: '30%'}, 
}

const Accounts = () => {
    const p = useContext(MainContext)
    const [showReturns, updateShowReturns] = useState(false)

    let total = 0
    const accountList = p.accounts.map((a, i) => {
        total = total + a.amount
        const interest = getInterest(a.amount, a.interest, 10)
        return (
        <li key={i} style={{flexWrap: 'wrap'}}>
            <span style={s.intFirst}>{a.name}</span>
            <span style={s.intRight}>{(Math.round(a.interest * 10000)) / 100}%</span>
            <span style={s.intRight}>{money(a.amount)}</span>
            {(a.interest > 0 && showReturns) && <div style={s.intRow}>
                {
                    interest.map((amnt, i) => {
                        return (
                            i % 2 !== 0 && <p key={i} style={{color: '#999'}}>
                                Year {i} <br />
                                <span style={{color: '#555'}}>{money(amnt.earned / 12)}</span> <br />
                                per month
                            </p>
                        )
                    })
                }
            </div>}
        </li>)
    })
    return (
        <ContentBox title='Accounts' exClass='md' itemId='accountsModule' >
            <SoftList split className='mt-40'>
                <li style={{fontWeight: 'bold'}}>
                    <span style={s.intFirst}>Account name</span>
                    <span style={s.intRight}>Interest rate</span>
                    <span style={s.intRight}>Current balance</span>
                </li>
                {accountList}
            </SoftList>
            <div className='right'>
                <h3 style={{padding: '0px 8px 7px 6px'}}>{money(total)}</h3>
            </div>
            <div className='right'>
                <button className='btn blue'
                    onClick={()=> updateShowReturns(!showReturns)}
                >{showReturns ? 'Hide' : 'Show'} returns</button>
                <button className='btn'>Add account</button>
            </div>
        </ContentBox>
    )
}

export default Accounts