import {getObjIndex} from './functions'

export const parsePersonalBudget = (b, colors) => {
  let bud = {};
  let total = 0;
  let colorTrack = 0;
  b.forEach((bd, index) => {
    if (bud[bd.category]) {
      bud[bd.category].items.push({ id: bd.id ? bd.id : `bi-${index}`, ...bd });
      bud[bd.category].total = bud[bd.category].total + parseFloat(bd.amount);
    } else {
      bud[bd.category] = {
        items: [{ id: bd.id ? bd.id : `bi-${index}`, ...bd }],
        color: colors[colorTrack],
        total: parseFloat(bd.amount)
      };
      colorTrack++;
      if (colorTrack === colors.length) colorTrack = 0;
    }
    total += parseFloat(bd.amount);
  });
  return { budget: bud, total };
};

export const processDeleteBudgetItem = (oldBudget, cat, id, total) => {
  let newBudget = { ...oldBudget };
  let removeItem
  newBudget[cat].items.forEach(item => {
    if (item.id === id) {
      removeItem = item
      return;
    }
  })
  total = parseFloat(total) - parseFloat(removeItem.amount)
  if (newBudget[cat].items.length === 1) delete newBudget[cat]
  else {
    newBudget[cat] = {
      ...oldBudget[cat],
      items: newBudget[cat].items.filter(b => b.id !== removeItem.id),
      total: parseFloat(newBudget[cat].total) - parseFloat(removeItem.amount)
    }
  }
  return { budget: newBudget, total }
}

export const processAddBudgetItem = (oldBudget, bi, colors, total) => {
  let newBudget = { ...oldBudget };
  total = parseFloat(total) + parseFloat(bi.amount)
  if (newBudget[bi.category]) {
    newBudget[bi.category].total =
      parseFloat(newBudget[bi.category].total) + parseFloat(bi.amount);
    newBudget[bi.category].items.push();
  } else {
    newBudget[bi.category] = {
      color:
        Object.keys(newBudget).length >= colors.length
          ? colors[Object.keys(newBudget).length % colors.length]
          : colors[Object.keys(newBudget).length],
      items: [{ ...bi, amount: parseFloat(bi.amount) }],
      total: parseFloat(bi.amount)
    };
  }
  return { budget: newBudget, total };
};

export const processUpdateBudgetItem = (oldBudget, oldBi, bi, colors, total) => {
  let newBudget = { ...oldBudget };
  total = (parseFloat(total) - parseFloat(oldBi.amount)) + parseFloat(bi.amount)
  newBudget[oldBi.category].total = parseFloat(newBudget[oldBi.category].total) - parseFloat(oldBi.amount)
  if (oldBi.category === bi.category) newBudget[bi.category].items[getObjIndex(newBudget[oldBi.category].items, 'id', bi.id)] = { ...bi } 
  else {
    newBudget[oldBi.category].items = newBudget[oldBi.category].items.filter(bItem => bItem.id !== bi.id)
    if (newBudget[bi.category]) newBudget[bi.category].items.push(bi)
    else {
      newBudget[bi.category] = {
        color:
          Object.keys(newBudget).length >= colors.length
            ? colors[Object.keys(newBudget).length % colors.length]
            : colors[Object.keys(newBudget).length],
        items: [{ ...bi, amount: parseFloat(bi.amount) }],
        total: parseFloat(bi.amount)
      };
    }
    if(newBudget[oldBi.category].items.length < 1) delete newBudget[oldBi.category]
  }

  newBudget[bi.category].total = parseFloat(newBudget[bi.category].total) + parseFloat(bi.amount)
  return {budget: newBudget}
}