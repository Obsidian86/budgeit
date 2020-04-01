import { calcMoney } from './convert'

export const getObjIndex = (arr, key, val) => {
  let ind
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i][key] + "") === (val + "")) {
      ind = i
      break
    }
  }
  return ind
}

export const genId = () => {
  const a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
  const t = new Date().getUTCMilliseconds()
  const n = `${Math.floor(Math.random() * 1000)}${t}${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)}`
  let x = ''
  n.split('').forEach(z => x = x + '' + a[z])
  return x
}


export const getInterest = (amount, rate, years) => {
  if(rate === 0) return [{amount: amount, earned: 0}]
  rate = rate / 100
  let amounts = [{amount: amount, earned: parseFloat((amount * rate))}]
  for(let i=0; i<years; i++){
    const earned = calcMoney(amounts[i].amount, amounts[i].earned) * rate
    const amount = calcMoney(amounts[i].earned, amounts[i].amount)
    amounts.push({amount, earned })
  }
  return amounts
}