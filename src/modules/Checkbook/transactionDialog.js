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
        type: transaction ? transaction.type : 'withdrawl',
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
        getSubPopupContent(popUp, handleFieldChange, updatePopUp, budget, formData)

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
                    <button className='choose-category' onClick={()=> updatePopUp('category')}>
                        Choose <br /> existing
                    </button>
                    <IP type='text' label='Category' errors={errors} alias='category' data={formData} onChange={handleFieldChange} showPH='category' />
                </div>
                <div className='md' onClick={()=>updatePopUp('type')}>
                    <IP 
                        type='text' 
                        label='Type' 
                        alias='type' 
                        data={formData} 
                        onChange={() => null}
                    />
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
