export const colors = [
  'red',
  'orange',
  'green',
  'yellow',
  'pink',
  'blue',
  'tan',
  'teal',
  'salmon',
  'Tomato',
  'DodgerBlue',
  'MediumSeaGreen',
  'SlateBlue',
  'Violet',
  'darkblue',
  'darkgreen'
]

export const getColor = (items) => {
  let usedCols = []
  for(const it in items){
    usedCols.push(items[it].color)
  }
  const c = [...colors].filter(clr => !usedCols.includes(clr))
  if(!c || c.length < 1){ return('gray')}
  return(c[0])
} 