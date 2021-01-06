import React, { useState } from 'react'
import { money, } from '../../utilities/convert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Transaction = ({tr, filter, setTransactionDialog, handleDelete, transactionAccount}) => {
    const [open, updateOpen] = useState(false)
    const date = new Date(tr.date)
    const showDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    const isCredit = transactionAccount[0].accountType === 'Credit'
    const useType = isCredit 
        ? tr.type === 'withdraw' ? 'payment' : 'charge'
        : tr.type
    return(
        <div 
            style={{'cursor': 'pointer'}}
            className={
                `transaction-card 
                ${useType} ${open ? 'showActions' : ''} 
                ${(filter.replace(/ /g, '') === '' || tr.name.toLowerCase().includes(filter.toLowerCase())) ? '' : 'hide-transaction'}`
            } onClick={()=> updateOpen(!open)}>
            <div className='actions'>
                <i onClick={()=>handleDelete(tr)}><FontAwesomeIcon icon={faTrash} /></i>
                <i onClick={()=>setTransactionDialog('update', tr)}><FontAwesomeIcon icon={faPencilAlt} /></i>
            </div>
            <div className='card'>
                <div className='row between'>
                    <span>{useType}</span>
                    <span>{showDate}</span>
                </div>
                <div className='row between main'>
                    <span>{tr.name}</span>
                    <span>{money(tr.amount)}</span>
                </div>
                <div className='right'>
                    <span>{tr.category}</span>
                </div>
            </div>
        </div>
    ) 
}

export default Transaction