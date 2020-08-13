export const Months = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
export const Days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
export const daysInMonth = (month, year) => new Date(year, month, 0).getDate()
export const monthStartOn = (month, year) => Days[new Date(year, month - 1, 1).getDay()]
export const tMonth = () => new Date().getMonth() + 1
export const tYear = () => new Date().getFullYear()
export const msToDays = ms => (ms / 1000) / 86400
export const parsedCurrentDate = (inDate) => { // 4-11-2019 format
  const tDate = inDate ? pDate(inDate) : new Date()
  return `${tDate.getMonth() + 1}-${tDate.getDate()}-${tDate.getFullYear()}`
}
export const pDate = (inDate) => { // return system readable date
  if(!inDate) return new Date()
  if(inDate.split && inDate.indexOf(':') > 0 && inDate.indexOf('T') > 0 && inDate.indexOf('.') > 0){
    const spl = inDate.split('T')[0]
    const split = spl.split('-')
    return new Date(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2]))
  }
  if(!inDate.split && new Date(inDate)){
    return new Date(inDate)
  }
  const splDate = inDate.split('-')
  return new Date(splDate[2], parseInt(splDate[0]) - 1, splDate[1])
}

export const stepDate = (newDate = [], stepAmount = '', incr = 1, join = false) => {
  // stepAmount = daily, weekly , biWeekly, monthly, yearly
  newDate = newDate.map(d => parseInt(d))
  if (stepAmount === 'd' || stepAmount === 'daily')  { newDate[1] = newDate[1] + incr }
  if (stepAmount === 'w' || stepAmount === 'weekly')  { newDate[1] = newDate[1] + (7 * incr) }
  if (stepAmount === 'bw' || stepAmount === 'biWeekly') { newDate[1] = newDate[1] + 14 }
  if (stepAmount === 'm' ||stepAmount === 'monthly')  { newDate[0] = newDate[0] + incr }
  if (stepAmount === 'y' || stepAmount === 'yearly')  { newDate[2] = newDate[2] + incr } 
  if (newDate[1] > daysInMonth(newDate[0], newDate[2])) {
    newDate[1] = newDate[1] - daysInMonth(newDate[0], newDate[2])
    newDate[0]++
  }
  if (newDate[0] > 12) {
    newDate[0] = 1
    newDate[2]++
  }
  return join ? newDate.join('-') : newDate
}
