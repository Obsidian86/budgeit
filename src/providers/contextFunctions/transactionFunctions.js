import makeCall from "../../api"

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

export const submitTransaction = async (mode, transaction, username, transactions, saveState) => {
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
        return({message: 'Submitted transaction'})
    } else return({message: 'Error submitting transaction. Please try again later'}) 
}