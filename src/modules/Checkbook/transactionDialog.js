import React, { useState } from 'react'
import { IP } from '../../utilities/formUtilities'
import { money } from '../../utilities/convert'
import StyledPopUpForm from './StyledPopUpForm'
import getSubPopupContent from './popupContent/getSubPopupContent'
import * as popupFucntions from './popupContent/popupFunctions'
import s from './objectStyles'
import { pDate } from '../components/calendar/dateFunctions'

const TransactionForm = ({submitDialogForm, setDialog, accountData, budget, transaction, mode}) => {
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
        popupFucntions.handleSubmitForm(formData, submitDialogForm, setDialog, updateErrors, mode)
    const handleChangeDate = inDate  => 
        handleFieldChange({ target: { name: 'date', value: inDate } }) 
    const popUpData = 
        getSubPopupContent(popUp, handleFieldChange, updatePopUp, budget)

    return (
        <StyledPopUpForm className='contentBox'>
            { popUp && popUpData }
            <div className='row' style={s.rowContainer}>
                <div className='before-after'>
                    <span> {money(formData.before)} -> {money(formData.after)} </span>
                </div>
                <div className='md'>
                    <IP type='text' errors={errors} label='Name' alias='name' data={formData} onChange={handleFieldChange} showPH='transaction name' />
                </div>
                <div className='md'>
                    <IP type='number' errors={errors} label='Amount' alias='amount' data={formData} onChange={handleFieldChange} showPH='amount'/>
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
                <div className='md date-box' style={s.dateBox} > Date </div>
                <div className='md date-box' style={s.btnContainer}>
                    <IP type='date' alias='date' data={formData} onChange={(date) => handleChangeDate(date)} />
                </div>
                <div className='max right btn-group' style={{maxWidth: '93%', marginTop: '20px'}}> 
                    <IP type='btn_red' onChange={() => setDialog({open: false})} label='Cancel' />
                    <IP 
                        type='btn_green' 
                        onChange={() => handleSubmit()} 
                        label='Add' 
                    />
                </div>
            </div>
        </StyledPopUpForm>
    )
}

const transactionDialog = (setDialog, mode = 'add', submitDialogForm, accountData, budget, transaction) => {
    const header = mode === 'add' ? 'New transaction' :
        mode === 'delete' ? 'Delete transaction' : 'Update transaction'
    const formProps = {submitDialogForm, setDialog, accountData, budget, transaction, mode}
    setDialog({
        open: true,
        header: accountData.name + ': ' + header, 
        sticky: true,
        content: <TransactionForm {...formProps} />
      })
}

export default transactionDialog