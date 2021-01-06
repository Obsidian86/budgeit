import React from 'react'
import { calcMoney } from '../../utilities/convert'

const AccountList = ({accounts, selectedAccount, updateSelectedAccount, money, minimize}) => {
    let total = 0
    const accList = accounts.map(acc => {
        if (acc.accountType === 'Credit') {
            total = calcMoney(total, acc.amount, 'subtract')
        } else {
            total = calcMoney(acc.amount, total)
        }
        if(minimize && acc.id !== selectedAccount) return null
        return (
           <li 
                key={acc.id}
                onClick={()=>updateSelectedAccount(acc.id)}
                className={`row between ${selectedAccount === acc.id ? 'selected' : ''}`}
            >
                <div>{acc.name}</div>
                <div>
                    <span style={{
                        backgroundColor: acc.accountType === 'Credit' ? 'salmon' : '#fff',
                        color: '#222', 
                    }}>
                        {money(acc.amount)}
                    </span>
                </div>
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