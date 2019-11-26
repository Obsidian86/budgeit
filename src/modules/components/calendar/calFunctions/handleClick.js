import * as DF from '../dateFunctions'

const handleClick = (callBack, data, end, date, props, state) => {
    const {returnItems} = props
    const {dateInfo, eventInfo} = state
    if (returnItems) { // collect items to return
      data.items = []
      const pushData = (dataItems, itemDate) => {
        console.log(dataItems)
        dataItems.forEach(it => data.items.push({ ...it, itemDate }))
      }
      // get current day
      const currDate = new Date()
      let safety = 0
      let testDate = date || `${currDate.getMonth() + 1}-${currDate.getDate()}-${currDate.getFullYear()}`
      end = end || `${dateInfo.m}-${DF.daysInMonth(dateInfo.m, dateInfo.y)}-${dateInfo.y}`
      if(new Date(end) < new Date(date)) return callBack(data)
      while (safety < 90) {
        const splDate = testDate.split('-')
        if (eventInfo[splDate[2]]) {
          let t = eventInfo[splDate[2]]
          if (t[splDate[0]]) {
            t = t[splDate[0]]
            console.log(t[splDate[1]])
            console.log( splDate[1] )
            if (t[splDate[1]]){
              pushData(t[splDate[1]], testDate)}
          }
        }
        safety = safety + 1
        const stDate = DF.stepDate(splDate, 'daily')
        testDate = stDate.join('-')
        if (testDate === end) safety = 5999
      }
    }
    console.log(state)
    callBack(data) 
  }

  export default handleClick