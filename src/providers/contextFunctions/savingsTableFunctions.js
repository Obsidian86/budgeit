import { saveResource } from './storage'

export const updateSavingsTables = async (table, hasTableData, username, saveState) => {
  let newState = { savingsTable: table }
  const postData = {tableData: table}
  let response
  if(hasTableData){
    postData['id'] = hasTableData
    response = await saveResource('put', 'savingstable', postData, username, hasTableData)
  }else{
    response = await saveResource('save', 'savingstable', postData, username, null)
    newState['hasTableData'] = (response && response.data && response.data.length > 0 && response.data[0].id) || null
  }
  response && !response['error'] && (hasTableData || newState['hasTableData']) && saveState(newState)
}