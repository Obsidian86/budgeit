import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const styles = {
    transferCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 0 3px gray',
        padding: '7px',
        borderRadius: '2px',
        marginTop: '22px',
        marginRight: '10px',
        minWidth: '130px',
        backgroundColor: '#fff',
        fontSize: '.83rem'
    },
    toCard: {
        borderTop: '8px solid green'
    },
    fromCard: {
        borderTop: '8px solid gray'
    },
    p: {
        padding: '0',
        margin: '0 0 4px 0'
    },
    tab: {
        backgroundColor: 'green', 
        padding: '4px 6px', 
        borderRadius: '3px', 
        color: '#fff'
    }
}

const AccountListItem = (props) => {
    const {s, a, money, interest, Bullet, updateEdittingItem, updateShowForm, showReturns, addAccountToEstimator, updateView, transfers, accounts, handleEditTransfers} = props
    const [showOptions, updateShowOptions] = useState(false)

    const transfersTo = transfers.filter(tr => tr.toAccount + '' === a.id + '')
    const transfersFrom = transfers.filter(tr => tr.fromAccount + '' === a.id + '')

    const getAccount = (id) => {
        const ac = accounts.filter(acc => acc.id + '' === id + '')
        return ac.length > 0 ? ac[0].name : ''
    }

    return(
        <li style={{flexWrap: 'wrap', cursor: 'pointer', boxShadow: showOptions ? '0 0 2px rgba(0,0,0,.3)' : 'none'}} onClick={()=>updateShowOptions(!showOptions)}>
            <span style={s.intFirst}> <Bullet color={a.liquid ? 'green' : 'orange'} size={12} /> {a.name}</span>
            <span style={s.intRight}>{a.interest}%</span>
            <span style={s.intRight} className={showOptions ? 'mb-10' : null}>{money(a.amount)}</span>
            <span style={s.intLast} className={showOptions ? 'mb-10' : null}>
                {showOptions ? '-' : '+'}
            </span>

            {showOptions && <div className='right w-100' style={{borderTop: '1px solid #d9d9d9', paddingTop: '15px', marginTop: '5px'}}>
                <Link to='/savings' className='btn narrow blue' style={{textDecoration: 'none'}} onClick={()=> addAccountToEstimator(a)}>
                    Add to estimator
                </Link>
                <button className='btn narrow' onClick={()=> {
                    const n = new Promise((resolve, reject)=> resolve(updateEdittingItem(a)) )
                    n.then(()=>updateShowForm(true))
                    .then(()=>updateView('accountForm', 'accountsModule'))
                }}> Edit account
                </button>
            </div>}
            <div className='row mb-10 start'>
                <div className='mt-20 mr-20' style={styles.tab}>Transfers to account: {transfersTo.length}</div>
                <div className='mt-20' style={styles.tab}>Transfers from account: {transfersFrom.length}</div>
                {showOptions && <div className='w-99 row start'>
                    { (transfersTo.length + transfersFrom.length > 0) && <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Transfers</h3> }
                    {transfersTo.map(tr => {
                        return(
                            <div key={tr.id} style={{...styles.transferCard, ...styles.toCard}}>
                                <p style={{...styles.p, color: '#888', margin: '0'}} className='muted'>From account</p>
                                <p style={styles.p}>{getAccount(tr.fromAccount)}</p>
                                <p style={styles.p}>{money(tr.amount)}</p>
                                <button className='btn green narrow' onClick={(e) =>{
                                    e.stopPropagation()
                                    handleEditTransfers(tr)
                                }}>Edit</button>
                            </div>
                        )
                    })}
                    {transfersFrom.map(tr => {
                        return(
                            <div key={tr.id} style={{...styles.transferCard, ...styles.fromCard}}>
                                <p style={{...styles.p, color: '#888', margin: '0'}} className='muted'>To account</p>
                                <p style={styles.p}>{getAccount(tr.toAccount)}</p>
                                <p style={styles.p}>{money(tr.amount)}</p>
                                <button className='btn green narrow' onClick={(e) =>{
                                    e.stopPropagation()
                                    handleEditTransfers(tr)
                                }}>Edit</button>
                            </div>
                        )
                    })}
                </div>}
            </div>
            {(a.interest > 0 && (showReturns || showOptions)) && <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Returns</h3>}
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