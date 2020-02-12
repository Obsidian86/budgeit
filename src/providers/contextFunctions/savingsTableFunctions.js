import { saveResource } from './storage'

export const updateSavingsTables = async (table, hasTableData, username, saveState) => {
  let newState = { savingsTable: table }
  if(hasTableData){
    await saveResource('put', 'savingstable', table, username, hasTableData)
  }else{
    const response = await saveResource('save', 'savingstable', table, username, null)
    newState['hasTableData'] = response.data[0].id
  }
  saveState(newState)
}