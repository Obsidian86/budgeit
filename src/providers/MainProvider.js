import React from "react";
import MainContext from "./MainContext";
import theme from "../styles/theme";
import { colors } from "../styles/colors";
import { convert } from "../utilities/convert";
import { save, load } from "../utilities/storage";

import { b } from "./tmpBg";

class MainProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 2000.0,
      viewBy: "m",
      theme: theme,
      budget: {},
      updateAmount: this.updateAmount,
      updateViewBy: this.updateViewBy,
      addBudgetItem: this.addBudgetItem
    };
  }
  componentDidMount = () => {
    this.setState(load());
    this.setState(this.parsePersonalBudget(b));
  };

  parsePersonalBudget = budget => {
    let bud = {};
    let total = 0;
    let colorTrack = 0;
    b.forEach(bd => {
      if (bud[bd.category]) {
        bud[bd.category].items.push(bd);
        bud[bd.category].total = bud[bd.category].total + parseFloat(bd.amount);
      } else {
        bud[bd.category] = {
          items: [bd],
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

  updateAmount = amount =>
    this.setState(
      {
        amount: convert(amount.initialAmount, amount.initialRec, "w")
      },
      () => save(this.state)
    );

  updateViewBy = v => this.setState({ viewBy: v }, () => save(this.state));
  addBudgetItem = bi => {
    let newBudget = { ...this.state.budget };
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
    this.setState(
      {
        budget: newBudget
      },
      () => save(this.state)
    );
  };

  render() {
    return (
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

export default MainProvider;
