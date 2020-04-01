import React from 'react'

const AccountList = ({accounts, selectedAccount, updateSelectedAccount, money}) => {
    const accList = accounts.map(acc => {
        return (
           <li 
                key={acc.id}
                onClick={()=>updateSelectedAccount(acc.id)}
                className={`${selectedAccount === acc.id ? 'selected' : ''}`}
            >
                <span>{acc.name}</span>
                <span>{money(acc.amount)}</span>
            </li>
        )
    })

    return(<ul>{accList}</ul>)
}

export default AccountList