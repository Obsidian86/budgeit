import React from 'react'
import MainContext from './MainContext'
import theme from '../styles/theme'
import { colors } from '../styles/colors'
import * as mem from '../utilities/storage'
import * as bdg from './contextFunctions/budgetFunctions'
import * as src from './contextFunctions/sourcesFunctions'
import Dialog from '../modules/interface/Dialog'

// TEMP
import { currAccs } from './currAcc'
import tmpBg from './tmpBg'
import sources from './sources'

// TESTING
const autoFill = false
const purgeMem = true

class MainProvider extends React.Component {
  constructor () {
    super()
    this.defaultVals = {
      amount: autoFill ? 2000 : null, // income amount set by user
      accounts: autoFill ? currAccs : [],
      viewBy: 'm',
      dialog: { open: false },
      theme: theme,
      budget: {},
      total: 0, // total amount budgeted
      savingsTable: [{ 0: { stAmount: 0, interest: 0, deposit: 0 } }],
      incomeSources: autoFill ? sources : []
    }
    this.methods = {
      updateViewBy: this.updateViewBy,
      updateSavingsTables: this.updateSavingsTables,
      setDialog: this.setDialog,
      // Budget CRUD
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem,
      // Source CRUD
      addSource: this.addSource,
      deleteSource: this.deleteSource,
      updateSource: this.updateSource
    }
    this.state = {
      ...this.defaultVals,
      ...this.methods
    }
  }

  // initialize data
  componentDidMount = () =>
    this.setState(
      purgeMem ? this.defaultVals : mem.load(), 
      () => autoFill && this.setState(bdg.parsePersonalBudget(tmpBg, colors))
    )
  saveState = newState => this.setState(newState, () => mem.save(this.state))

  // Income amount / sources 
  addSource = source => this.saveState(src.processAddSource(source, this.state.incomeSources, this.state.amount))
  deleteSource = sourceId => this.saveState(src.processDeleteSource(sourceId, this.state.incomeSources, this.state.amount))
  updateSource = sourceId => this.saveState(src.processUpdateSource(sourceId, this.state.incomeSources, this.state.amount))

  // View global view changes
  updateViewBy = v => this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })

  // budget CRUD
  addBudgetItem = (bi) => this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors, this.state.total))
  deleteBudgetItem = (cat, id) => this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id, this.state.total))
  updateBudgetItem = (oldBi, bi) => this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors, this.state.total))

  updateSavingsTables = (savingsTable) => this.saveState({ savingsTable: savingsTable })

  render = () =>
    <>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider
