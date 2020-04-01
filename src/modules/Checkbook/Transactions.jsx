import React, { useState } from 'react'
import { money, calcMoney } from '../../utilities/convert'

const Transaction = ({tr}) => {
    const [open, updateOpen] = useState(false)
    const date = new Date(tr.date)
    const showDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
    return(
        <div className={`transaction-card ${tr.type} ${open ? 'showActions' : ''}`} onClick={()=> updateOpen(!open)}>
            <div className='actions'>
                actions
            </div>
            <div className='card'>
                <div className='row between'>
                    <span>{tr.type}</span>
                    <span>{showDate}</span>
                </div>
                <div className='row between main'>
                    <span>{tr.payee}</span>
                    <span>{money(tr.amount)}</span>
                </div>
                <div className='row between'>
                    <span>{tr.category}</span>
                    <span>{money(tr.before)} -> {money(tr.after)}</span>
                </div>
            </div>
        </div>
    ) 
}

export default Transaction