import React from 'react'
import MainContext from './MainContext'
import theme from '../styles/theme'
import { colors } from '../styles/colors'
import { convert } from '../utilities/convert'
import * as mem from '../utilities/storage'
import * as bdg from '../utilities/budgetFunctions'
import Dialog from '../modules/interface/Dialog'

import { currAccs } from './currAcc'
import tmpBg from './tmpBg'
import sources from './sources'

const autoFill = true
const purgeMem = false

class MainProvider extends React.Component {
  constructor () {
    super()
    this.defaultVals = {
      amount: autoFill ? 2000 : null, // income amount set by user
      viewBy: 'm',
      theme: theme,
      budget: {},
      total: 1, // total amount budgetted
      dialog: { open: false },
      accounts: autoFill ? currAccs : [],
      savingsTable: [{ 0: { stAmount: 0, interest: 0, deposit: 0 } }],
      incomeSources: autoFill ? sources : []
    }
    this.methods = {
      updateAmount: this.updateAmount,
      updateViewBy: this.updateViewBy,
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem,
      updateSavingsTables: this.updateSavingsTables,
      setDialog: this.setDialog
    }
    this.state = {
      ...this.defaultVals,
      ...this.methods
    }
  }

  // initialize data
  componentDidMount = () =>
    this.setState(purgeMem ? this.defaultVals : mem.load(), 
    () => autoFill && this.setState(bdg.parsePersonalBudget(tmpBg, colors))
  )
  saveState = newState =>
    this.setState(newState, () => mem.save(this.state))

  // Income amount / sources 
  updateAmount = amount =>
    this.saveState({ amount: convert(amount.initialAmount, amount.rec, 'w') })

  // View global view changes
  updateViewBy = v =>
    this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })

  // budget CRUD
  addBudgetItem = (bi) =>
    this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors, this.state.total))
  deleteBudgetItem = (cat, id) =>
    this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id, this.state.total))
  updateBudgetItem = (oldBi, bi) =>
    this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors, this.state.total))
  updateSavingsTables = (savingsTable) =>
    this.saveState({ savingsTable: savingsTable })

  render = () =>
    <>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider
