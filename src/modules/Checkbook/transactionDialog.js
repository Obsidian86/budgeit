import React, { useState } from 'react'
import { IP } from '../../utilities/formUtilities'
import StyledPopUpForm from './StyledPopUpForm'
import getSubPopupContent from './popupContent/getSubPopupContent'
import * as popupFucntions from './popupContent/popupFunctions'
import { pDate } from '../components/calendar/dateFunctions'
import styled from 'styled-components'
import { calcMoney, money } from '../../utilities/convert'

const TransactionForm = ({submitDialogForm, accountData, budget, transaction, mode, setTransactionDialog}) => {
    const [errors, updateErrors] = useState({})
    const date = new Date()
    const [formData, updateFormData] = useState({
        name: transaction ? transaction.name : '',
        amount: transaction ? transaction.amount : 0,
        category: transaction ? transaction.category : null,
        type: transaction ? transaction.type : accountData.accountType === 'Credit' ? 'charge' :'withdraw',
        before: transaction ? transaction.before : accountData.amount,
        after: transaction ? transaction.after : accountData.amount,
        id: transaction ? transaction.id : null,
        date: transaction ? pDate(transaction.date) : date,
        accountId: accountData.id
    })
    const [popUp, updatePopUp] = useState(null)

    const handleFieldChange = event => 
        popupFucntions.handleFieldChange(event, formData, accountData, updateFormData)
    const handleSubmit = () => 
        popupFucntions.handleSubmitForm(formData, submitDialogForm, setTransactionDialog, updateErrors, mode, accountData)
    const handleChangeDate = inDate  => 
        handleFieldChange({ target: { name: 'date', value: inDate } }) 
    const popUpData = 
        getSubPopupContent(popUp, handleFieldChange, updatePopUp, budget, formData, accountData.accountType)

    return (
        <StyledPopUpForm>
            { popUp ? popUpData :
            <div className='row'>
                {!formData.id && <p className='text-left fw-b w-100 m-0 pt-5 pl-10'>
                    {
                        formData.type === 'adjustment'
                            ? `Account difference: ${money(calcMoney(formData.amount, accountData.amount, 'subtract'))}`
                            : `New account value: ${money(formData.after)}`
                    }
                </p>}
                <div className='date-box'>
                    <label> Date </label>
                    <IP type='date' alias='date' data={formData} onChange={(date) => handleChangeDate(date)} />
                </div>
                <div className='md'>
                    <IP type='text' errors={errors} label='Name' alias='name' data={formData} onChange={handleFieldChange} showPH='transaction name' />
                </div>
                <div className='md'>
                    <IP type='number' 
                        errors={errors} 
                        label={formData.type === 'adjustment' ? 'New account Value' : 'Amount'}
                        alias='amount'
                        data={formData}
                        onChange={handleFieldChange}
                        showPH='amount'
                    />
                </div>
                <div className='md'>
                    <IP type='text' label='Category' errors={errors} alias='category' data={formData} onChange={handleFieldChange} showPH='category' />
                    <button className='choose-category' onClick={()=> updatePopUp('category')}>
                        Choose existing
                    </button>
                </div>
                <div className='md '>
                    <label>Transaction type</label>
                    <button className='choose-transaction-type-button' onClick={()=>updatePopUp('type')}>
                        <span>
                            {accountData.accountType === 'Credit'
                                ? formData.type === 'withdraw' 
                                    ? 'payment' : formData.type === 'deposit' 
                                        ? 'charge' : formData.type 
                                : formData.type
                            }
                        </span>
                    </button>
                </div>
                <div className='max right btn-group' style={{maxWidth: '93%', marginTop: '20px'}}> 
                    <IP type='btn_red' onChange={() => setTransactionDialog(null, null, false)} label='Cancel' />
                    <IP 
                        type='btn_green' 
                        onChange={() => handleSubmit()} 
                        label={transaction && transaction.id ? 'Update': 'Add'}
                    />
                </div>
            </div> }
        </StyledPopUpForm>
    )
}

const StyledTransactionPopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 60;
    & .box-title{
        font-weight: bold;
        margin: 7px;
        font-size: 1.1rem;
    }
    & .pop-up-content{
        max-width: 800px;
        padding: 6px;
        background-color: #fff;
        width: 90%;
        max-height: 90vh;
        overflow: auto;
        margin: 0;
    }
    & .choose-transaction-type-button {
        display: block;
        width: 94%;
        color: #333;
        padding: 15px 5px;
        margin: 10px auto 15px auto;
        border: none;
        border-left: 4px solid #1bcf21;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #1bcf21;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
        background-color: #f5fdff;
        font-weight: bold;
        cursor: pointer;
    }
`

const TransactionDialog = ({ mode = 'add', submitDialogForm, accountData, budget, transaction, setTransactionDialog}) => {
    const header = mode === 'add' ?
        'New transaction' : mode === 'delete' ?
            'Delete transaction' : 'Update transaction'
    const formProps = {submitDialogForm, accountData, budget, transaction, mode, setTransactionDialog}
    return (
        <StyledTransactionPopup>
            <div className='pop-up-content contentBox'>
                <div className='box-title'>
                    {accountData.name + ': ' + header}
                </div>
                <TransactionForm {...formProps} />
            </div>
        </StyledTransactionPopup>
    )
}
export default TransactionDialog
