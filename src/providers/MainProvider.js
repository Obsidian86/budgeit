import React from "react";
import MainContext from "./MainContext";
import theme from "../styles/theme";
import { colors } from "../styles/colors";
import { convert } from "../utilities/convert";
import * as mem from "../utilities/storage";
import * as bdg from '../utilities/budgetFunctions';
import Dialog from '../modules/interface/Dialog'
import { b } from "./tmpBg";



// let b = []
let startAmount = 2000

class MainProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: startAmount,
      viewBy: "m",
      theme: theme,
      budget: {},
      total: 1,
      dialog: { open: false },
      updateAmount: this.updateAmount,
      updateViewBy: this.updateViewBy,
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem,
      updateSavingsTables: this.updateSavingsTables,
      setDialog: this.setDialog,
      savingsTable: []
    };
  }
  componentDidMount = () => this.setState(mem.load(), () => this.setState(bdg.parsePersonalBudget(b, colors)))

  saveState = newState => this.setState(newState, () => mem.save(this.state))
  updateAmount = amount => this.saveState({ amount: convert(amount.initialAmount, amount.initialRec, "w") })
  updateViewBy = v => this.saveState({ viewBy: v });

  setDialog = dialog => this.setState({dialog})

  addBudgetItem = (bi) => this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors, this.state.total))
  deleteBudgetItem = (cat, id) => this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id, this.state.total))
  updateBudgetItem = (oldBi, bi) => this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors, this.state.total))

  updateSavingsTables = (savingsTable) => this.saveState({savingsTable: savingsTable})

  render = () =>
    <>
      { this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider;
