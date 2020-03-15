import { saveResource } from './storage'

export const updateSavingsTables = async (table, hasTableData, username, saveState) => {
  let newState = { savingsTable: table }
  const postData = {tableData: table}
  let response
  if(hasTableData){
    // postData['id'] = hasTableData
    // response = await saveResource('put', 'savingstable', postData, username, hasTableData)
  }else{
    // response = await saveResource('save', 'savingstable', postData, username, null)
    // newState['hasTableData'] = (response && response.data && response.data.length > 0 && response.data[0].id) || null
  }
  // response && !response['error'] && (hasTableData || newState['hasTableData']) && saveState(newState)
  saveState(newState)
}

export const processTables = (formDataIn, savingsTable) => {
  let formData = {...formDataIn}
  Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
  let newTable = {}
  let currentAmount = formData.stAmount
  formData.depAmount = formData.depAmount * (12 / formData.per)
  for (let i = 1; i < (formData.years + 1); i++) {  
    let newAge = formData.startAge + i
    let tableRow = {
      stAmount: currentAmount,
      interest: currentAmount * (formData.rate / 100),
      deposit: formData.depAmount
    }
    newTable[newAge] = tableRow
    currentAmount = currentAmount + formData.depAmount + (currentAmount * (formData.rate / 100))
  }

  newTable.startAmount = formDataIn.stAmount
  newTable.startInterest = formDataIn.rate
  newTable.deposit = formData.depAmount
  newTable.startAge = formData.startAge
  if(formDataIn.accountName) newTable.accountName = formDataIn.accountName

  let combineTables = [...savingsTable]
  combineTables[0] = {}
  combineTables.push({...newTable})
  return(combineTables)
}