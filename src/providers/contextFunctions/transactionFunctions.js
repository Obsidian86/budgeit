import makeCall from "../../api"
import { calcMoney } from "../../utilities/convert"

export const loadTransactions = async (accountId, username, transactions, saveState) => {
    const info = { username, requireAuth: true }
    info.endPoint = 'loadTransactions'
    info.method = 'GET'
    info.targetParam = accountId
    const response = await makeCall(info)
    if(response.data && response.data.length > 0){
        let resp = response.data[0]
        return saveState({transactions: { ...transactions, [accountId]: resp }})
    }
    saveState({transactions: { ...transactions, [accountId]: [] } })
}

export const deleteTransaction = async(accountData, transaction, username, transactions, updateAccount, saveState) => {
    const info = {
        endPoint: 'deleteTransaction',
        username: username,
        id: transaction.id,
        targetParam: accountData.id,
        method: 'DELETE',
        requireAuth: true
    }
    const response = await makeCall(info)
    if(response.data && response.data.length > 0){
        let updatedTransactions = {
            ...transactions,
            [accountData.id]: [...transactions[accountData.id].filter(tr => tr.id !== transaction.id)]
        }
        saveState({ transactions: updatedTransactions })
        // update account after transaction
        let action = transaction.type === 'deposit' ? 'add' : 'subtract'
        let updatedAccount = { 
            ...accountData, 
            amount: calcMoney(accountData['amount'], transaction['amount'], action)
        }
        updateAccount(updatedAccount)
        return({message: 'Transaction deleted'})
    } else  return({message: 'Error deleting transaction. Please try again later'})
}

export const submitTransaction = async (transaction, username, transactions, saveState, accountData, updateAccount) => {
    const info = { username, requireAuth: true }
    info.endPoint = 'newTransaction'
    info.method = 'POST'
    info.body = transaction
    const response = await makeCall(info)
    if(response.data && response.data.length > 0){
        const resp = response.data[0]
        const accountId = transaction.accountId
        const updatedTransactions = transactions[accountId] ?
            {...transactions, [accountId]: [...transactions[accountId], resp]}
            : { ...transactions, [accountId]: [resp] }
        saveState({transactions: updatedTransactions})

        // update account after transaction
        let action = transaction.type === 'deposit' ? 'add' : 'subtract'
        let updatedAccount = { 
            ...accountData, 
            amount: calcMoney(accountData['amount'], transaction['amount'], action)
        }
        updateAccount(updatedAccount)
        return({message: 'Submitted transaction'})
    } else return({message: 'Error submitting transaction. Please try again later'}) 
}

export const updateTransaction = async (transaction, username, transactions, saveState, accountData, updateAccount) => {
    const info = { username, requireAuth: true }
    info.endPoint = 'newTransaction'
    info.method = 'PUT'
    info.body = transaction
    const response = await makeCall(info)
    if(response.data && response.data.length > 0){
        const accountId = transaction.accountId
        let oldTransaction
        const updatedTransactions = {
            ...transactions,
            [accountId]: [...transactions[accountId].map(tra => {
                if(tra.id === transaction.id){
                    oldTransaction = tra
                    return transaction
                } else {
                    return tra
                }
            })]
        }
        saveState({transactions: updatedTransactions})
        // oposite of old type to remove
        let action = oldTransaction.type === 'deposit' ? 'subtract' : 'add'
        let updatedAmount = calcMoney(accountData['amount'], transaction['amount'], action)
        // update amount
        let newAction = transaction.type === 'deposit' ? 'add' : 'subtract'
        updatedAmount = calcMoney(accountData['amount'], transaction['amount'], newAction)
        // remove old / add new
        let updatedAccount = {...accountData, amount: updatedAmount }
        updateAccount(updatedAccount)
        return({message: 'Submitted transaction'})
    } else return({message: 'Error submitting transaction. Please try again later'}) 
}