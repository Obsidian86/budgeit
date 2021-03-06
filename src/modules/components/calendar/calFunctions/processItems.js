import * as DF from '../dateFunctions'

const processItems = (items, startProc, endProc) => {
    const processedItems = {}
    items.forEach(it => {
      //TO DO if no End
      const prDate = DF.pDate(it.date)
      if (it.rec) {
        let lPro = 0
        let dateTarg = prDate
        let calcDate = it.date
        while ((dateTarg <= DF.pDate(it.end) || !it.end) && lPro < 6000) {
          const newDate = calcDate.split('-').map(d => parseInt(d))
          if(parseInt(newDate[2]) > parseInt(endProc)){
            lPro = 5999
            break;
          }else if(parseInt(newDate[2]) >= parseInt(startProc)){
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
          }
          const getNewDate = DF.stepDate(newDate, it.rec) 
          calcDate = getNewDate.join('-')
          dateTarg = DF.pDate(calcDate)
          lPro++
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