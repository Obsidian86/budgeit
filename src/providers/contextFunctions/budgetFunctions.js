import { getObjIndex } from '../../utilities/functions'
import { convert } from '../../utilities/convert'
import { getColor } from '../../styles/colors'
import { saveResource } from './storage'

// Local is for processing items in initial rendering
export const processDeleteBudgetItem = async (data, local, oldBudget, total, username, accountTransfers, saveState) => {
  const { cat, id } = data
  let response
  let useAccountTransfer = null

  const newBudget = { ...oldBudget }
  let removeItem
  for(const item in newBudget[cat].items){
    if (newBudget[cat].items[item].id === id) {
      removeItem = newBudget[cat].items[item]
      break
    }
  }

  if (username) {
    response = await saveResource("delete", "budgetitems", null, username, id)
    if (response && response.data && response.data.length > 1) {
      useAccountTransfer = response.data[1]
    }
  } else {
    if (removeItem.linkedTransfer && removeItem.linkedTransfer !== '') {
      useAccountTransfer = {
        deleted: true,
        id: removeItem.linkedTransfer
      }
    }
  }

  const monthAmount = convert(removeItem.amount, removeItem.rec, "m")
  total = parseFloat(total) - parseFloat(monthAmount)
  if (newBudget[cat].items.length === 1) delete newBudget[cat]
  else {
    newBudget[cat] = {
      ...oldBudget[cat],
      items: newBudget[cat].items.filter(b => b.id !== removeItem.id),
      total: parseFloat(newBudget[cat].total) - parseFloat(monthAmount)
    }
  }

  let newState = { budget: newBudget, total }

  // Account transfer
  if(useAccountTransfer){
    const trItem = useAccountTransfer
    if (trItem.deleted){
      newState.accountTransfers = accountTransfers.filter(at => at.id + '' !== trItem.id + '')
    }
  } 

  saveState(newState)
}

export const processAddBudgetItem = async (newBi, local, oldBudget, total, username, accountTransfers, saveState) => {
  if(!newBi['end']) newBi['end'] = ''
  if(!newBi['noEnd']) newBi['noEnd'] = 'on'
  if(!newBi['isTransfer'] || newBi['isTransfer'] === "") newBi['isTransfer'] = 'off'

  let response = null
  let bi = { ...newBi, id: Date.now() }
  if (username) {
    response = local 
      ? {data: [newBi]}
      : await saveResource("save", "budgetitems", newBi, username, null)
    if(response && response.data && response.data.length > 0){
      bi = response.data[0]
    }
  }
  
  if(bi['end'] === '') delete bi['end']
  const newBudget = { ...oldBudget }
  bi.category = (!bi.category || bi.category === undefined || bi.category.replace(' ', '') === '') ? 'No category' : bi.category
  const monthAmount = convert(bi.amount, bi.rec, "m") // conv amnt to month to add to total
  total = parseFloat(total) + parseFloat(monthAmount)
  if (newBudget[bi.category]) {
    newBudget[bi.category].total = parseFloat(newBudget[bi.category].total) + parseFloat(monthAmount)
    newBudget[bi.category].items.push(bi)
  } else {
    newBudget[bi.category] = {
      color: getColor(newBudget),
      items: [{ ...bi}],
      total: parseFloat(monthAmount)
    }
  }
  if(local) return ({ budget: newBudget, total }) // for initial rendering
  else {
    let newState = { budget: newBudget, total }
    // Account transfer
    if(response && response.data && response.data.length > 1){
      newState.accountTransfers = [...accountTransfers, response.data[1]]
    }
    saveState(newState)
  }
}

export const processUpdateBudgetItem = async (data, local, oldBudget, total, username, accountTransfers, saveState) => {
  let { bi, oldBi } = data

  let response = null
  let useAccountTransfer = null
  if (username) {
    response = await saveResource("put", "budgetitems", bi, username, bi.id)
    if (response && response.data && response.data.length > 0) {
      bi = {...response.data[0]}
      if (response.data.length > 1) {
        useAccountTransfer = response.data[1]
      }
    }
  } else {
    if (oldBi.isTransfer === 'on' && bi.isTransfer === 'off'){ 
      useAccountTransfer = {
        id: bi.linkedTransfer,
        deleted: true
      }
    }
    if (bi.isTransfer === 'on') {
      let useId = Date.now()
      useAccountTransfer = {
        amount: bi.amount,
        date: bi.date,
        id: useId,
        nextAuto: "2-20-3000",
        rec: bi.rec,
        fromAccount: bi.transferFromAccount,
        toAccount: bi.transferToAccount
      }
      bi.linkedTransfer = useId
    }
  }

  const newBudget = { ...oldBudget }
  const monthAmount = parseFloat(convert(bi.amount,  bi.rec, "m"))
  const oldMonthAmount = parseFloat(convert(oldBi.amount,  bi.rec, "m"))
  const oldCat = oldBi.category
  bi.category = (!bi.category || bi.category === undefined || bi.category.replace(' ', '') === '') ? 'No category' : bi.category
  total = (parseFloat(total) - oldMonthAmount) + monthAmount
  newBudget[oldCat].total = parseFloat(newBudget[oldCat].total) - oldMonthAmount
  if (oldCat === bi.category) { // update in place
    const itemIndex = getObjIndex(newBudget[oldCat].items, 'id', bi.id)
    newBudget[bi.category].items[itemIndex] = { ...bi }
  } else {
    newBudget[oldCat].items = newBudget[oldCat].items.filter(bItem => bItem.id !== bi.id)
    if (newBudget[bi.category]) newBudget[bi.category].items.push(bi)
    else {
      newBudget[bi.category] = {
        color: getColor(newBudget),
        items: [{ ...bi, amount: parseFloat(bi.amount) }],
        total: parseFloat(monthAmount)
      }
    }
    if (newBudget[oldCat].items.length < 1) delete newBudget[oldCat]
  }
  newBudget[bi.category].total = parseFloat(newBudget[bi.category].total) + parseFloat(monthAmount)

  let newState = { budget: newBudget, total }
  // If is account transfer and data returned
  if(useAccountTransfer){
    const trItem = useAccountTransfer
    if (trItem.deleted){
      newState.accountTransfers = accountTransfers.filter(at => at.id + '' !== trItem.id + '')
    } else {
      newState.accountTransfers = [...accountTransfers].map(at => {
        if(at.id === trItem.id){
          return ({
            ...at,
            ...trItem
          })
        } else {
          return at
        }
      })
    }
  }

  saveState(newState)
}
