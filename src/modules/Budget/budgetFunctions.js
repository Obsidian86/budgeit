import suggested from '../../utilities/suggested'
import { convert } from "../../utilities/convert";

export const processData = (p, percentLeft) => {
    const catOptions = []
    const track = []
    const data = []
    Object.keys({ ...p.budget, ...suggested }).forEach(b => {
      let bI = b.toLowerCase()
      if (!track.includes(bI)) {
        catOptions.push({ d: bI, v: bI })
        track.push(bI)
      }
    })
    data.push({
      title: "Unallocated",
      value: isNaN(percentLeft) ? 100 : (100 - percentLeft),
      color: "gray"
    });
    Object.keys(p.budget).forEach(bd => {
      data.push({
        title: bd,
        value:
          (convert(p.budget[bd].total, "m", p.viewBy) /
            convert(p.amount, "w", p.viewBy)) *
          100,
        color: p.budget[bd].color
      });
    });
    return {catOptions, data}
}