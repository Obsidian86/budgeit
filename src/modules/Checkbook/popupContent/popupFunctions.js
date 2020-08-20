import { calcMoney } from '../../../utilities/convert'
import { validForm } from '../../../utilities/formUtilities'

export const handleFieldChange = (event, formData, accountData, updateFormData) => {
    let newState = { ...formData, [event.target.name]: event.target.value}

    let useAmount = event.target.name === 'amount' ? event.target.value : formData.amount
    let useType = event.target.name === 'type' ? event.target.value : formData.type

    if(event.target.name === 'amount' || event.target.name === 'type'){
        if(event.target.name === 'amount' && event.target.value.toString().replace(/ /g, '') === ''){
            newState.after = accountData.amount
        } else{
            newState.after = useType === 'withdrawl' ? 
                calcMoney(accountData.amount, useAmount, 'subtract') :
                calcMoney(accountData.amount, useAmount)
        }
    }
    updateFormData(newState)
}

export const handleSubmitForm = (formData, submitDialogForm, setTransactionDialog, updateErrors, mode) => {
    const fields = [
        { name: 'name', req: true, type: 'text' },
        { name: 'amount', req: true, type: 'number' },
        { name: 'category', req: true, type: 'text' },
        { name: 'type', req: true, type: 'text' },
        { name: 'before', req: true, type: 'text' },
        { name: 'after', req: true, type: 'text' },
        { name: 'date', req: true, type: 'text' },
      ]
    let errors = validForm(fields, formData)
    updateErrors(errors)
    if(Object.keys(errors).length < 1){ 
        setTransactionDialog(null, null, false)
        submitDialogForm(formData, mode)
    }
}