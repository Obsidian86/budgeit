import React from "react";
import MainContext from "./MainContext";
import theme from "../styles/theme";
import { colors } from "../styles/colors";
import { convert } from "../utilities/convert";
import * as mem from "../utilities/storage";
import * as bdg from '../utilities/budgetFunctions';
import Dialog from '../modules/interface/Dialog'
import { b } from "./tmpBg";

class MainProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 2000,
      viewBy: "m",
      theme: theme,
      budget: {},
      dialog: { open: false },
      updateAmount: this.updateAmount,
      updateViewBy: this.updateViewBy,
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem,
      setDialog: this.setDialog
    };
  }
  componentDidMount = () => this.setState(mem.load(), () => this.setState(bdg.parsePersonalBudget(b, colors)))

  saveState = newState => this.setState(newState, () => mem.save(this.state))
  updateAmount = amount => this.saveState({ amount: convert(amount.initialAmount, amount.initialRec, "w") })
  updateViewBy = v => this.saveState({ viewBy: v });

  setDialog = dialog => this.setState({dialog})

  addBudgetItem = (bi) => this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors))
  deleteBudgetItem = (cat, id) => this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id))
  updateBudgetItem = (oldBi, bi) => this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors))

  render = () =>
    <>
      { this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider;
