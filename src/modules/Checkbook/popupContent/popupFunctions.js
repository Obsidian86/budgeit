import { calcMoney } from '../../../utilities/convert'
import { validForm } from '../../../utilities/formUtilities'

export const handleFieldChange = (event, formData, accountData, updateFormData) => {
    let newState = { ...formData, [event.target.name]: event.target.value}

    let useAmount = event.target.name === 'amount' ? event.target.value : formData.amount
    let useType = event.target.name === 'type' ? event.target.value : formData.type
    useType = useType === 'charge' ? 'deposit' : useType === 'payment' ? 'withdraw' : useType

    if(event.target.name === 'amount' || event.target.name === 'type'){
        if(event.target.name === 'amount' && event.target.value.toString().replace(/ /g, '') === ''){
            newState.after = accountData.amount
        } else{
            newState.after = useType === 'withdraw' ? 
                calcMoney(accountData.amount, useAmount, 'subtract') :
                calcMoney(accountData.amount, useAmount)
        }
        if(event.target.name === 'type' && event.target.value === 'adjustment'){
            newState.amount = accountData.amount
            newState.after = accountData.amount
            newState.name = 'Adjustment'
            newState.category = 'Adjustment'
        }
        if(formData.type === 'adjustment' && event.target.name === 'type' && event.target.value !== 'adjustment'){
            newState.amount = 0
            newState.after = accountData.amount
            newState.name = ''
            newState.category = ''
        }
    }
    updateFormData(newState)
}

export const handleSubmitForm = (formDataIn, submitDialogForm, setTransactionDialog, updateErrors, mode, accountData) => {
    let formData = {...formDataIn}

    if(formData.type === 'adjustment'){
        formData.after = formData.amount
        let useAmount = calcMoney(formData.amount, accountData.amount, 'subtract')
        if(useAmount >= 0) {
            formData.type = 'deposit'
        } else {
            formData.type = 'withdraw'
            useAmount = useAmount * -1
        }
        formData.amount = useAmount
    }

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