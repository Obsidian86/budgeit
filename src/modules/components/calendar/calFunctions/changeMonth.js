import * as DF from '../dateFunctions'

const changeMonth = (dir, updateDateInfo, handleClick, props, state) => {
    const { dateInfo } = state
    const { clickNext, clickPrev } = props
    let nMonth = dateInfo.m
    const oldDate = { ...dateInfo }
    nMonth = dir === 'next' ? nMonth + 1 : nMonth - 1
    let nYear = dateInfo.y
    if (nMonth > 12) {
      nMonth = 1
      nYear = nYear + 1
    }
    if (nMonth < 1) {
      nMonth = 12
      nYear = nYear - 1
    }
    const newDate = { m: nMonth, y: nYear }
    updateDateInfo(newDate)
    const handler = dir === 'next' ? clickNext : clickPrev
    handleClick(
      handler, 
      { old: oldDate, new: newDate }, 
      `${newDate.m}-${DF.daysInMonth(newDate.m, newDate.y)}-${newDate.y}`
    )
  }

  export default changeMonth