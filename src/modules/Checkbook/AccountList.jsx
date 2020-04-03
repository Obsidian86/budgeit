import React from 'react'
import { calcMoney } from '../../utilities/convert'

const AccountList = ({accounts, selectedAccount, updateSelectedAccount, money}) => {
    let total = 0
    const accList = accounts.map(acc => {
        total = calcMoney(acc.amount, total)
        return (
           <li 
                key={acc.id}
                onClick={()=>updateSelectedAccount(acc.id)}
                className={`row between ${selectedAccount === acc.id ? 'selected' : ''}`}
            >
                <div>{acc.name}</div>
                <div><span>{money(acc.amount)}</span></div>
                <div>{acc.liquid ? 'Liquid' : 'Non-liquid'}</div>
                <div>{acc.interest}%</div>
            </li>
        )
    })

    return(<>
        <div className='row between'>
            <strong>Accounts</strong>
            <strong className='mr-10 t-green'>{money(total)}</strong>
        </div>
        <ul>{accList}</ul>
    </>)
}

export default AccountList