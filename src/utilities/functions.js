export const getObjIndex = (arr, key, val) => {
  let ind
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
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
