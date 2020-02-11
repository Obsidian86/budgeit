import { saveResource } from './storage'

export const updateSavingsTables = (table, username, saveState) => {
  const hasData = table.length > 1
  if(hasData){
    saveResource('update', 'savingstable', table, username, 1)
  }else{
    saveResource('save', 'savingstable', table, username, null)
  }
  saveState({ savingsTable: table })
}