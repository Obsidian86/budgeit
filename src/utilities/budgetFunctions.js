import { getObjIndex, genId } from './functions'
import { convert } from './convert'

export const parsePersonalBudget = (b, colors) => {
  const bud = {}
  let total = 0
  let colorTrack = 0
  b.forEach((bd) => {
    const bdMonth = parseFloat(convert(bd.amount, bd.rec, "m"))
    if (bud[bd.category]) {
      bud[bd.category].items.push({ id: bd.id ? bd.id : genId(), ...bd })
      bud[bd.category].total = bud[bd.category].total + bdMonth
    } else {
      bud[bd.category] = {
        items: [{ id: bd.id ? bd.id : genId(), ...bd }],
        color: colors[colorTrack],
        total: bdMonth
      }
      colorTrack++
      if (colorTrack === colors.length) colorTrack = 0
    }
    total += bdMonth
  })
  return { budget: bud, total }
}

export const processDeleteBudgetItem = (oldBudget, cat, id, total) => {
  const newBudget = { ...oldBudget }
  let removeItem
  for(const item in newBudget[cat].items){
    if (newBudget[cat].items[item].id === id) {
      removeItem = newBudget[cat].items[item]
      break
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
  return { budget: newBudget, total }
}

export const processAddBudgetItem = (oldBudget, bi, colors, total) => {
  const newBudget = { ...oldBudget }
  bi.id = genId()
  const monthAmount = convert(bi.amount, bi.rec, "m") // conv amnt to month to add to total
  total = parseFloat(total) + parseFloat(monthAmount)
  if (newBudget[bi.category]) {
    newBudget[bi.category].total = parseFloat(newBudget[bi.category].total) + parseFloat(monthAmount)
    newBudget[bi.category].items.push(bi)
  } else {
    newBudget[bi.category] = {
      color:
        Object.keys(newBudget).length >= colors.length
          ? colors[Object.keys(newBudget).length % colors.length]
          : colors[Object.keys(newBudget).length + 1],
      items: [{ ...bi}],
      total: parseFloat(monthAmount)
    }
  }
  return { budget: newBudget, total }
}

export const processUpdateBudgetItem = (oldBudget, oldBi, bi, colors, total) => {
  const newBudget = { ...oldBudget }
  const monthAmount = parseFloat(convert(bi.amount,  bi.rec, "m"))
  const oldMonthAmount = parseFloat(convert(oldBi.amount,  bi.rec, "m"))
  const oldCat = oldBi.category

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
        color:
          Object.keys(newBudget).length >= colors.length
            ? colors[Object.keys(newBudget).length % colors.length]
            : colors[Object.keys(newBudget).length],
        items: [{ ...bi, amount: parseFloat(bi.amount) }],
        total: parseFloat(monthAmount)
      }
    }
    if (newBudget[oldCat].items.length < 1) delete newBudget[oldCat]
  }

  newBudget[bi.category].total = parseFloat(newBudget[bi.category].total) + parseFloat(monthAmount)
  return { budget: newBudget, total }
}
