import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import SoftList from './interface/SoftList'
import { money } from '../utilities/convert'
import { getInterest } from '../utilities/functions'
import Form from './interface/Form'
import { IP, validForm } from '../utilities/formUtilities'
import Bullet from './interface/Bullet'
import AccountListItem from './components/AcountListItem'

const s = {
    intRow: {
        width: '100%', 
        padding: '3px', 
        marginTop: '9px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    intFirst: {textAlign: 'left', width: '40%'}, 
    intRight: {textAlign: 'right', width: '30%'}
}

const Accounts = () => {
    const p = useContext(MainContext)
    const [showReturns, updateShowReturns] = useState(false)
    const [showForm, updateShowForm] = useState(false)
    const [errors, updateErrors] = useState({})
    const [edittingItem, updateEdittingItem] = useState(null)

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
        if(edittingItem){
            p.updateAccount(account)
            updateEdittingItem(false)
        } else {
            p.addAccount(account)
        }
        updateShowForm(false)
        updateErrors({})
        p.updateView('accountsModule')
    }

    const deleteAccount = (accountId, clearData) => {
        p.setDialog({
          open: true,
          header: 'Delete account', 
          message: <>Are you sure you want to delete this account? <br /> This can not be undone.</>, 
          confirm: ()=>{
            p.deleteAccount(accountId)
            updateEdittingItem(null)
            updateShowForm(false)
            updateErrors({})
            clearData()
            p.updateView('accountsModule')
          },
          reject: ()=>{ return null }
        })  
      }

    let total = 0
    let liquid = 0
    const accountList = p.accounts.map((a, i) => {
        total = total + parseFloat(a.amount)
        if(a.liquid) liquid = liquid + parseFloat(a.amount)
        const interest = getInterest(parseFloat(a.amount), parseFloat(a.interest), 10)
        return (    
            <AccountListItem 
                key={i} s={s} a={a} Bullet={Bullet}
                money={money} interest={interest} showReturns={showReturns}
                updateEdittingItem={updateEdittingItem} updateShowForm={updateShowForm}
                addAccountToEstimator = {p.addAccountToEstimator}
                updateView = {p.updateView}
            />
        )
    })
    return (
        <ContentBox title='Accounts' exClass={'mx row'} itemId='accountsModule' >
            <div className={`mt-40 ${(showForm || accountList.length < 1) ? 'md' : 'max'}`}>
                { accountList.length < 1 ? <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Add an account</h2>
                : <>
                    <SoftList split>
                        <li style={{fontWeight: 'bold'}}>
                            <span style={s.intFirst}>Account name</span>
                            <span style={s.intRight}>Interest rate</span>
                            <span style={s.intRight}>Current balance</span>
                        </li>
                        {accountList}
                    </SoftList>
                    <div className='right' style={{marginBottom: '5px'}}>
                        <h3 style={{padding: '0px 8px 7px 6px', color: 'green'}} >Liquid: {money(liquid)} </h3>
                        <h3 style={{padding: '0px 8px 7px 6px', color: 'orange'}} >Non liquid: {money(total - liquid)} </h3>
                        <h3 style={{padding: '0px 8px 7px 6px'}}>Total: {money(total)}</h3>
                    </div>
                    <div className='right'>
                        <button className='btn blue'
                            onClick={()=> updateShowReturns(!showReturns)}
                        >{showReturns ? 'Hide' : 'Show'} returns</button>
                        <button className='btn'
                            onClick={()=> updateShowForm(!showForm)}
                        >{showForm ? 'Hide form' : 'Add account'}</button>
                    </div>
                </>}
            </div>
            {(showForm || accountList.length < 1)  && <div className='md mt-40' id='accountForm'>
                <Form
                    reDefault   
                    defaultFormData = {edittingItem ? edittingItem : {}}
                    render={(updateField, formData, clearData) => {
                        return(
                            <>
                                <IP type='text' alias='name' data={formData} label='Account name' errors={errors} onChange={e => updateField(e) } showPH='Account name' />
                                <IP type='number' alias='interest' data={formData} label='Interest rate' errors={errors} onChange={e => updateField(e) } showPH='0%' />
                                <IP type='number' alias='amount' data={formData} label='Amount' errors={errors} onChange={e => updateField(e) } showPH='Amount' />
                                <IP type='checkbox' style={{margin: '0 auto'}} alias='liquid' data={formData} label='Liquid' errors={errors} onChange={e => {
                                    updateField({
                                        target: {
                                            value: formData.liquid ? false : true,
                                            name: 'liquid'
                                        }
                                    })
                                }} />
                                <span className='right mt-40'>
                                    {edittingItem && 
                                        <button
                                            className='btn red'
                                            onClick={()=> deleteAccount(formData.id, clearData)}
                                        >
                                            Delete
                                        </button>
                                    }
                                    <button 
                                        className='btn blue' 
                                        onClick={() =>{
                                            edittingItem && updateShowForm(false);
                                            updateEdittingItem(null);
                                            updateErrors({})
                                            clearData();
                                        }}
                                    >
                                        {edittingItem ? 'Cancel' : 'Clear'}
                                    </button>
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