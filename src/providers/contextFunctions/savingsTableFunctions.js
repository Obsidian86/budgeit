import { saveResource } from './storage'
import { getObjIndex } from '../../utilities/functions'

export const addSavingsTables = async(data, currentProcessedTables, currentTables, username, saveState) => {
  let response 
  if (username) {
    response = await saveResource("save", "savingstables", data, username, null)
  } else {
    response = { data: [{ ...data, id: Date.now() }] }
  }

  if(response && response.data && response.data.length > 0){
    const tableData = response.data[0]
    const combineTables = processTables(tableData, currentProcessedTables)
    saveState({ 
      savingsTable: combineTables,
      savingsTables: [...currentTables, tableData]
    })
  }
}

export const deleteSavingsTables = async(tableId, currentProcessedTables, currentTables, username, saveState) => {
  let response 
  if (username) {
    response = await saveResource("delete", "savingstables", null, username, tableId)
  } else {
    response = { data: [{ id: tableId }] }
  }
  if(response && response.data && response.data.length > 0){
    const ind = getObjIndex(currentTables, 'id', response.data[0].id)
    const foundTable = { ...currentTables[ind] }
    const savingsTables = [...currentTables].filter(s => (s.id + "") !== (foundTable.id + ""))
 
    const processedTables = savingsTables.reduce((curTables, table) => {
      return processTables(table, curTables)
    }, [{}]) 

    saveState({
      savingsTables: [...savingsTables],
      savingsTable: processedTables
    })
  }
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
  newTable.id = formData.id
  if(formDataIn.accountName) newTable.accountName = formDataIn.accountName

  let combineTables = [...savingsTable]
  combineTables[0] = {}
  combineTables.push({...newTable})
  return(combineTables)
}