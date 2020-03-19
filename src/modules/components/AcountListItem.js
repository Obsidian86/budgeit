import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const AccountListItem = (props) => {
    const {s, a, money, interest, Bullet, updateEdittingItem, updateShowForm, showReturns, addAccountToEstimator, updateView} = props
    const [showOptions, updateShowOptions] = useState(false)
    return(
        <li style={{flexWrap: 'wrap', cursor: 'pointer'}} onClick={()=>updateShowOptions(!showOptions)}>
            <span style={s.intFirst}> <Bullet color={a.liquid ? 'green' : 'orange'} size={12} /> {a.name}</span>
            <span style={s.intRight}>{a.interest}%</span>
            <span style={s.intRight} className={showOptions ? 'mb-10' : null}>{money(a.amount)}</span>
            {showOptions && <div className='right w-100 mt-10'>
                <Link to='/savings' className='btn narrow blue' style={{textDecoration: 'none'}} onClick={()=> addAccountToEstimator(a)}>
                    Add to estimator
                </Link>
                <button className='btn narrow' onClick={(a)=> {
                    const n = new Promise((resolve, reject)=> resolve(updateEdittingItem(a)) )
                    n.then(()=>updateShowForm(true))
                    .then(()=>updateView('accountForm', 'accountsModule'))
                }}> Edit account
                </button>
            </div>}
            {(a.interest > 0 && (showReturns || showOptions)) && <div style={s.intRow}>
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
        </li>
    )
}

export default AccountListItem