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

export const stepDate = (inDate = [], stepAmount = '', incr = 1, join = false) => {
  let newDate = Array.isArray(inDate) ? inDate : inDate.split('-')
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

export const dMatch = (date1, date2, match=['d']) => {
  let isMatch = true
  const d1 = date1.split('-')
  const d2 = date2.split('-')
  if( match.includes('d') ){
    if(d1[1] !== d2[1]) isMatch = false
  }
  if( match.includes('m') ){
    if(d1[0] !== d2[0]) isMatch = false
  }
  if( match.includes('y') ){
    if(d1[2] !== d2[2]) isMatch = false
  }
  return isMatch
}

export const dGreater = (date1, date2) => {
  if (date1 === date2) return 0
  const d1 = date1.split('-')
  const d2 = date2.split('-')
  if(parseInt(d1[2]) > parseInt(d2[2]) ) return 1
  if(parseInt(d1[2]) < parseInt(d2[2]) ) return -1
  if(parseInt(d1[0]) > parseInt(d2[0]) ) return 1
  if(parseInt(d1[0]) < parseInt(d2[0]) ) return -1
  if(parseInt(d1[1]) > parseInt(d2[1]) ) return 1
  if(parseInt(d1[1]) < parseInt(d2[1]) ) return -1
  return
}

export const onDateRange = (rec, date1, date2) => {
  let track = dGreater(date1, date2)
  let dateTrack = date1
  let i = 0
  while(track === -1 && i < 200){
    dateTrack = stepDate(dateTrack.split('-'), rec, 1, true)
    track = dGreater(dateTrack, date2)
    i++
  }
  return track === 0 ? true : false
}

export const getDateRangeArray = (rec, date1, date2) => {
  let track = dGreater(date1, date2)
  let dateTrack = date1
  let i = 0
  let arr = []
  while(track < 1 && i < 320){
    arr.push(dateTrack)
    dateTrack = stepDate(dateTrack.split('-'), rec, 1, true)
    track = dGreater(dateTrack, date2)
    i++
  }
  return arr
}

export const getAge = inDate => {
  const today = new Date();
  const birthDate = pDate(inDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}