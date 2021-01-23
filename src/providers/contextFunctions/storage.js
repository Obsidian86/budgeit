import { convert } from '../../utilities/convert'
import { processAddBudgetItem } from './budgetFunctions'
import { processTables } from './savingsTableFunctions'
import api from '../../api'

// Save resource then return resource
export const saveResource = async (command, targetParam, data, profile, id) => {
  let endPoint, method
  if (command === 'save') {
    endPoint = 'createSource'
    method = 'POST'
  } else if (command === 'delete') {
    endPoint = 'editSource'
    method = 'DELETE'
  } else if (command === 'put') {
    endPoint = 'editSource'
    method = 'PUT'
  }
  const saveData = await api({endPoint, targetParam, username: profile, id, body: data, method, requireAuth: true})
  return saveData
}

// Loads all data from API
export const load = async (profile) => {
  const getData = await api({endPoint: 'getUser', username: profile, requireAuth: true})
  if(!getData || !getData.data){
    return {profile: null}
  }
  const data = getData.data[0]
  if(!data || !data.sources) return ({profile: null})
  const newIncomeSource = []
  const amount = data.sources.reduce((p, c) => {
    let useAmount = convert(c.amount, c.rec, "w")
    newIncomeSource.push({...c, category: 'income'})
    return(p + useAmount)
  }, 0)
  let newBudget = {}
  let newTotal = 0
  for(const b in data.budgetItems){
    const {budget, total} = await processAddBudgetItem(data.budgetItems[b], true, newBudget, newTotal, profile, ()=>{})
    newBudget = {...budget}
    newTotal = total
  }

  const savingsTables = data && data.savingsTables
  const accountTransfers = (data && data.accountTransfers) || []
  const userInfo = (data && data.userInfo) || {}
  const processedTables = savingsTables ? savingsTables.reduce((curTables, table) => {
    return processTables(table, curTables)
  }, [{}]) : [{}]


  const newState = {
    profile,
    amount,
    userInfo,
    accountTransfers,
    budget: newBudget,
    savingsTables,
    total: newTotal,
    savingsTable: processedTables,
    accounts: data.accounts,
    incomeSources: newIncomeSource,
    snapshots: data.snapshots,
    viewBy: 'm',
  }
  return newState
}