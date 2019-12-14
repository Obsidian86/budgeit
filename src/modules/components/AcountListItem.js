import React, {useState} from 'react'

const AccountListItem = ({s, a, money, interest, Bullet, updateEdittingItem, updateShowForm, showReturns, addAccountToEstimator, updateView}) => {
    const [showOptions, updateShowOptions] = useState(false)
    return(
        <li style={{flexWrap: 'wrap', cursor: 'pointer'}} onClick={()=>updateShowOptions(!showOptions)}>
            <span style={s.intFirst}> <Bullet color={a.liquid ? 'green' : 'orange'} size={12} /> {a.name}</span>
            <span style={s.intRight}>{a.interest}%</span>
            <span style={s.intRight} className={showOptions ? 'mb-10' : null}>{money(a.amount)}</span>
            {showOptions && <div className='right w-100 mt-10'>
                <button className='btn narrow blue' onClick={()=>addAccountToEstimator(a)}>Add to estimator</button>
                <button className='btn narrow' onClick={()=> {
                    const n = new Promise((resolve, reject)=>{
                        return resolve(
                            updateEdittingItem(a)
                            
                        ); 
                    })
                    n.then(()=>updateShowForm(true))
                    .then(()=>updateView('accountForm', 'accountsModule'))
                }}>Edit account</button>
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