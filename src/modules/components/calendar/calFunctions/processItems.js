import * as DF from '../dateFunctions'

const processItems = (items) => {
    const processedItems = {}
    items.forEach(it => {
      const prDate = new Date(it.date)
      if (it.rec) {
        let loopProtect = 0
        let dateTarg = prDate
        let calcDate = it.date
        while (dateTarg <= new Date(it.end)) {
          const newDate = calcDate.split('-').map(d => parseInt(d))
          if (!processedItems[newDate[2]]) processedItems[newDate[2]] = {}
          let targ = processedItems[newDate[2]]
          if (!targ[newDate[0]]) targ[newDate[0]] = {}
          targ = targ[newDate[0]]
          let checkDay = newDate[1]
          if (checkDay > DF.daysInMonth(newDate[0], newDate[2])) checkDay = DF.daysInMonth(newDate[0], newDate[2])
          if (!targ[checkDay]) targ[checkDay] = []
          const newItem = {
            ...it,
            item: it.item,
            color: it.color ? it.color : null,
          }
          targ[checkDay].push(newItem)
          const getNewDate = DF.stepDate(newDate, it.rec) 
          calcDate = getNewDate.join('-')
          dateTarg = new Date(calcDate)
          loopProtect++
          if (loopProtect === 9000) break
        }
      } else {
        // Single date items
        if (!processedItems[prDate.getFullYear()]) processedItems[prDate.getFullYear()] = {}
        let targ = processedItems[prDate.getFullYear()]
        if (!targ[prDate.getMonth() + 1]) targ[prDate.getMonth() + 1] = {}
        targ = targ[prDate.getMonth() + 1]
        if (!targ[prDate.getDate()]) targ[prDate.getDate()] = []
        const newItem = {
          item: it.item,
          color: it.color ? it.color : null
        }
        targ[prDate.getDate()].push(newItem)
      }
    })
    return processedItems
}

export default processItems