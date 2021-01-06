import React, {useState} from 'react'
import { money } from '../../utilities/convert'
import { IP } from '../../utilities/formUtilities'
import { parsedCurrentDate } from '../components/calendar/dateFunctions'
import { recurrence } from '../../utilities/constants'
import { Link } from 'react-router-dom'

const TransfersForm = ({p, updateTransfersState, transferState}) => {
    const [errors, updateErrors] = useState({})
    const accountOptions = p.accounts
        .filter(a => a.accountType !== 'Credit')
        .map(acc => ({d: acc.name + ' - ' + money(acc.amount), v: acc.id}))

    const formData = {...transferState}

    const updateField = e => updateTransfersState({ ...transferState, [e.target.name]: e.target.value})
    const handlesubmit = () => {
        const errs = {}
        if(!formData.toAccount) errs['toAccount'] = 'Field required'
        if(!formData.fromAccount) errs['fromAccount'] = 'Field required'
        if(formData.toAccount && formData.fromAccount){
            if(formData.toAccount + '' === formData.fromAccount + ''){
                errs['fromAccount'] = 'Can not transfer to same account'
                errs['toAccount'] = 'Can not transfer to same account'
            }
            formData.toAccount = formData.toAccount + ''
            formData.fromAccount = formData.fromAccount + ''
        }

        if(!formData.amount || formData.amount.replace(/ /g, '') === ''){
            errs['amount'] = 'Field required'
        } else {
            if(!parseFloat(formData.amount)){
                errs['amount'] = 'Number required'
            }
        }
        if(!formData.rec) errs['rec'] = 'Field required'
        if(!formData.date) errs['date'] = 'Field required'
        updateErrors(errs)
        if(Object.keys(errs).length > 0) return
        const handler = transferState.id ? p.updateAccountTransfer : p.addAccountTransfer
        handler(formData)
        updateTransfersState(null)
    }

    const handleDeleteClick = () => {
        const itemId = transferState.id
        p.setDialog({
            open: true,
            header: 'Delete auto transfer', 
            message: <>Are you sure you want to delete this transfer? <br /> This can not be undone.</>, 
            confirm: ()=> {
                p.deleteAccountTransfer(itemId)
                updateTransfersState(null)
            },
            reject: ()=> null 
        }) 
    }

    let linkedBi = null
    if(transferState.id){
        let budgetArr = []
        Object.keys(p.budget).forEach(bi => {
            budgetArr = [...budgetArr, ...p.budget[bi].items]
        })
        linkedBi = budgetArr.filter(bi => bi.linkedTransfer && bi.linkedTransfer + '' === transferState.id + '')
    }

    return (
        <div className='row max' style={{
            padding: '20px 0',
            marginBottom: '30px'
        }}>
            <div className='w-99 t-green'>
                {
                    transferState.id ? 
                        <h2>Updating auto transfer</h2> :
                        <h2>Adding auto transfer</h2>
                }
                
            </div>
            <div className='max row'>
                <div className='md' style={{margin: '0'}}>
                    <IP type='drop' 
                        options={accountOptions} 
                        label='From account'
                        data={formData} 
                        style={{styles: 'width: 92%; margin: 15px auto 0 auto; padding: 12px 10px'}} 
                        alias='fromAccount' 
                        onChange={val => updateField({ target:{ value: val, name: 'fromAccount' } })} 
                        errors={errors} 
                    />
                </div>
                <div className='md' style={{margin: '0'}}>
                    <IP type='drop' 
                        options={accountOptions} 
                        label='to account'
                        data={formData} 
                        style={{styles: 'width: 92%; margin: 15px auto 0 auto; padding: 12px 10px'}} 
                        alias='toAccount' 
                        onChange={val => updateField({ target:{ value: val, name: 'toAccount' } })}
                        errors={errors}  
                    />
                </div>
            </div>
            <div className='max row mt-10'>
                <div className='thr' style={{margin: '0'}}>
                    <IP 
                        type='number' 
                        alias='amount' 
                        label="Amount" 
                        onChange={e => updateField(e)} 
                        data={formData} 
                        errors={errors}
                        showPH='00.00'
                    />
                </div>
                <div className='thr' style={{margin: '0'}}>
                    <IP 
                        type='drop' 
                        options={recurrence} 
                        label='Recurrence'
                        data={formData} 
                        style={{styles: 'width: 92%; margin: 15px auto 0 auto; padding: 12px 10px'}} 
                        alias='rec' 
                        onChange={val => updateField({ target:{ value: val, name: 'rec' } })} 
                        errors={errors} 
                    />
                </div>
                <div className='thr' style={{margin: '0'}}>
                    <IP 
                        type='date' 
                        alias='date' 
                        label='Start date' 
                        errors={errors} 
                        data={formData}  
                        onChange = {date => updateField({ target: { value: parsedCurrentDate(date), name: 'date' }})}
                    /> 
                </div>
            </div> 
            {!linkedBi || linkedBi.length < 1 ?
                <div className='w-99 right'>
                    {transferState.id && <button className='btn mt-10 mr-20 red' onClick={handleDeleteClick}>Delete</button>}
                    <button className='btn mt-10 mr-20 green' onClick={handlesubmit}>Submit</button>
                </div>
                : <>
                    <div className='center t-bold t-green' style={{fontSize: '1.1rem'}}>
                        <p> This transfer is set up through budgets: { linkedBi[0].item }  </p>
                    </div>
                    <div className='w-99 right'>
                        <Link to="/budget" className='btn mt-10 mr-20 green'>Edit budget</Link>
                    </div>
                </>
            }
        </div>
    )
}

export default TransfersForm