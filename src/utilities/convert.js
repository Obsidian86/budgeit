export const money = amount => {
  if (!parseFloat(amount)) return '$00.00'
  amount = parseFloat(amount).toFixed(2)
  const parts = amount.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts[0] + '.' + parts[1]
}

export const calcMoney = (am1, am2, action='add') => {
  if(action === 'subtract'){
    return (parseFloat(am1) * 100 - parseFloat(am2) * 100) / 100
  }
  if(action === 'add'){
    return (parseFloat(am1) * 100 + parseFloat(am2) * 100) / 100
  }
}

export const percent = (amt, total) => total ? `${((amt / total) * 100).toFixed(2)}%` : amt.toFixed(2) + '%'
export const getPercent = (amt, total) => (amt / 100) * total
export const up = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)}
export const disRec = re => {
  const convRec = {
    w: 'Per week',
    m: 'Per month',
    y: 'Per year',
    bw: 'Bi-weekly',
    d: 'Per day'
  }
  return convRec[re] ? convRec[re] : re
}

export const convert = (amount, rec = 'm', displayRec = 'm', ...args) => {
  const year = { m: 12, w: 52, bw: 26, y: 1, d: 365 }
  console.log(args)
  amount = parseFloat(amount)
  amount = (amount * year[rec]) / year[displayRec] 
  let returnVal = args.includes('money') ? money(amount) : amount
  if (args.includes('appendRec')) {
    returnVal += ` ${disRec(displayRec)}`
  }
  return returnVal
}
