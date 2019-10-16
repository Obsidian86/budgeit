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

export const processDeleteBudgetItem = (oldBudget, cat, id) => {
  let newBudget = { ...oldBudget };
  let removeItem
  newBudget[cat].items.forEach(item => {
    if (item.id === id) {
      removeItem = item
      return;
    }
  })
  if (newBudget[cat].items.length === 1) {
    delete newBudget[cat]
  } else {
    newBudget[cat] = {
      items: newBudget[cat].items.filter(b => b.id !== removeItem.id),
      total: parseFloat(newBudget[cat].total) - parseFloat(removeItem.total)
    }
  }
  return { budget: newBudget }
}

export const processAddBudgetItem =(oldBudget, bi, colors) => {
  let newBudget = { ...oldBudget };
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
  return { budget: newBudget };
};

export const processUpdateBudgetItem = (oldBudget, bi) => {
  let newBudget = { ...oldBudget };
  newBudget[bi.category].items.forEach((item, index)=> {
    if (item.id === bi.id) {
      newBudget[bi.category].total = ( parseFloat(newBudget[bi.category].total) - parseFloat(item.amount)) + parseFloat(bi.amount)
      newBudget[bi.category].items[index] = {...bi}
      return;
    }
  })
  return newBudget
}