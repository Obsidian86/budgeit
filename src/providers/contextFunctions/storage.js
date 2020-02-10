import { genId } from '../../utilities/functions'
import { convert } from '../../utilities/convert'
import { processAddBudgetItem } from './budgetFunctions'
import api from '../../api'

export const getProfiles = () => {
  const getProfs = localStorage.getItem('profiles')
  if(getProfs){
    const profiles = JSON.parse(getProfs)
    return (profiles.profiles && profiles.profiles.length >  0) ? profiles.profiles : null
  }
  return null
}

export const save = (data, profile) =>{
  if(!profile) profile = genId()
  const currentProfiles = getProfiles()

  let profiles = []
  if(currentProfiles && currentProfiles.length > 0){
    profiles = [...currentProfiles]
    let profIndex = profiles.indexOf(profile)
    if(profIndex > -1){
      profiles = profiles.filter((pr, i) => i !== profIndex)
    }
  }
  profiles.push(profile)

  localStorage.setItem('profiles', JSON.stringify({profiles}))
  localStorage.setItem(profile, JSON.stringify({...data, profile}))
  return profile
}

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
  const data = getData.data[0]
  const amount = data.sources.reduce((p, c) => {
    let useAmount = convert(c.amount, c.rec, "m")
    return(p + useAmount)
  }, 0)
  let newBudget = {}
  let newTotal = 0
  for(const b in data.budgetItems){
    const {budget, total} = await processAddBudgetItem(data.budgetItems[b], true, newBudget, newTotal, "", (r)=>console.log(r))
    newBudget = {...budget}
    newTotal = total
  }
  const  tableData = data.savingsTable[0].tableData.replace(/'/g, '"')
  const newTableData = JSON.parse(tableData)
  let newState = {
    profile,
    amount,
    budget: newBudget,
    total: newTotal,
    savingsTable: newTableData,
    accounts: data.accounts,
    incomeSources: data.sources,
    snapshots: data.snapshots,
    viewBy: 'm',
  }
  return newState
}

export const deleteCurrent = (profile) => {
  localStorage.removeItem(profile)
  let profs = getProfiles()
  profs = profs.filter(p => p !== profile)
  localStorage.setItem('profiles', JSON.stringify({profs}))
}

export const saveAndNew = (data, profile) => { // {profiles: ['pr1', 'pr2']}
  save(data, profile)
  return genId()
}

export const deleteData = () => localStorage.clear()