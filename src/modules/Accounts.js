import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import SoftList from './interface/SoftList'
import { money } from '../utilities/convert'
import { getInterest } from '../utilities/functions'
import Form from './Form'
import { IP, validForm } from '../utilities/formUtilities'

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
    const [showForm, updateShowForm] = useState(true)
    const [errors, updateErrors] = useState({})

    const handleSubmit = (account) => {
        account.interest = parseFloat(account.interest)
        account.amount = parseFloat(account.amount)

        const fields = [
            { name: 'name', req: true, type: 'text' },
            { name: 'interest', req: true, type: 'float' },
            { name: 'amount', req: true, type: 'float' }
          ]

        const errs = validForm(fields, account)
        if( Object.keys(errs).length > 0 ){
            return updateErrors(errs)
        }
        p.addAccount(account)
    }

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
        <ContentBox title='Accounts' exClass='lg row' itemId='accountsModule' >
            <div className={`mt-40 ${showForm ? 'md' : 'max'} `}>
                <SoftList split>
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
                    <button className='btn'
                        onClick={()=> updateShowForm(!showForm)}
                    >{showForm ? 'Hide form' : 'Add account'}</button>
                </div>
            </div>
            {showForm && <div className='md mt-40'>
                <Form
                    reDefault
                    defaultFormData = {{}}
                    render={(updateField, formData, clearData) => {
                        return(
                            <>
                                <IP type='text' alias='name' data={formData} label='Account name' errors={errors} onChange={e => updateField(e) } />
                                <IP type='text' alias='interest' data={formData} label='Interest rate' errors={errors} onChange={e => updateField(e) } />
                                <IP type='text' alias='amount' data={formData} label='Amount' errors={errors} onChange={e => updateField(e) } />
                                <span className='right'>
                                    <button className='btn red' onClick={() => clearData}>Clear</button>
                                    <button className='btn' onClick={()=> handleSubmit(formData) }>Submit</button>
                                </span>
                            </>
                        )
                    }}
                />
            </div>}
        </ContentBox>
    )
}

export default Accounts