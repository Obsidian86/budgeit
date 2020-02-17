import React from 'react'

export const processTables = (formDataIn, savingsTable, updateSavingsTables) => {
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
    updateSavingsTables(combineTables)
}

export const deleteTable = (index, savingsTable, setDialog, updateSavingsTables, updateView) => {
    setDialog({
      open: true,
      header: 'Delete table', 
      message: <>Are you sure you want to delete this table? <br /> This can not be undone.</>, 
      confirm: ()=>{
        let newTables = [...savingsTable]
        newTables.splice(index, 1)
        if(newTables.length === 1){ newTables = []}
        updateSavingsTables(newTables)
        updateView('savingsModule')
      },
      reject: ()=>{ return null }
    })  
  }