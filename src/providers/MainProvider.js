import React from "react";
import MainContext from "./MainContext";
import theme from "../styles/theme";
import { colors } from "../styles/colors";
import { convert } from "../utilities/convert";
import * as mem from "../utilities/storage";
import * as bdg from '../utilities/budgetFunctions';
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
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem
    };
  }
  componentDidMount = () => this.setState(mem.load(), () => this.setState(bdg.parsePersonalBudget(b, colors))) 

  saveState = newState => this.setState(newState, () => mem.save(this.state))
  updateAmount = amount => this.saveState({ amount: convert(amount.initialAmount, amount.initialRec, "w") })
  updateViewBy = v => this.saveState({ viewBy: v });

  addBudgetItem = (bi) => this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors))
  deleteBudgetItem = (cat, id) => this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id))
  updateBudgetItem = (oldBi, bi) => this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors))

  render = () => 
    <MainContext.Provider value={this.state}>
      {this.props.children}
    </MainContext.Provider> 
}

export default MainProvider;
