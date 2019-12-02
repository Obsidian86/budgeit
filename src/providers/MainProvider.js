import React from 'react'
import MainContext from './MainContext'
import theme from '../styles/theme'
import { colors } from '../styles/colors'
import * as mem from './contextFunctions/storage'
import * as bdg from './contextFunctions/budgetFunctions'
import * as src from './contextFunctions/sourcesFunctions'
import * as acn from './contextFunctions/accountFunctions'
import Dialog from '../modules/interface/Dialog'

class MainProvider extends React.Component {
  constructor () {
    super()
    this.defaultVals = {
      profile: null,
      amount: null, // income amount set by user
      accounts: [],
      viewBy: 'm',
      dialog: { open: false },
      theme: theme,
      budget: {},
      total: 0, // total amount budgeted
      savingsTable: [{ 0: { stAmount: 0, interest: 0, deposit: 0 } }],
      incomeSources: []
    }
    this.methods = {
      updateViewBy: this.updateViewBy,
      updateSavingsTables: this.updateSavingsTables,
      setDialog: this.setDialog,
      updateView: this.updateView,
      // Memory
      applyState: this.applyState,
      deleteData: this.deleteData,
      loadData: this.loadData,
      loadProfiles: this.loadProfiles,
      saveAndNew: this.saveAndNew,
      deleteCurrent: this.deleteCurrent,
      // Budget CRUD
      addBudgetItem: this.addBudgetItem,
      deleteBudgetItem: this.deleteBudgetItem,
      updateBudgetItem: this.updateBudgetItem,
      // Source CRUD
      addSource: this.addSource,
      deleteSource: this.deleteSource,
      updateSource: this.updateSource,
      // Accounts CRUD
      addAccount: this.addAccount,
      deleteAccount: this.deleteAccount,
      updateAccount: this.updateAccount
    }
    this.state = {
      ...this.defaultVals,
      ...this.methods
    }
  }

  // initialize data
  componentDidMount = () => this.setState(this.loadData())

  // Memory / profile tasks
  saveState = newState => this.setState(newState, this.applyState)

  applyState = () => {
    const profile = mem.save(this.state, this.state.profile)
    if(!this.state.profile) this.setState({profile}) 
  }

  deleteData = () => {
    mem.deleteData()
    this.setState(this.defaultVals)
  }
  deleteCurrent = (profile) => {
    mem.deleteCurrent(profile)
    this.setState({...this.defaultVals})
  }
  loadData = profile => {
    const hasData = mem.load(profile)
    if(hasData) this.setState(hasData)
  }

  loadProfiles = () => mem.getProfiles()

  saveAndNew = () => {
    const profile = mem.saveAndNew(this.state, this.state.profile)
    this.setState({...this.defaultVals, profile})
  }

  // Income amount / sources 
  addSource = source => this.saveState(src.processAddSource(source, this.state.incomeSources, this.state.amount))
  deleteSource = sourceId => this.saveState(src.processDeleteSource(sourceId, this.state.incomeSources, this.state.amount))
  updateSource = sourceId => this.saveState(src.processUpdateSource(sourceId, this.state.incomeSources, this.state.amount))

  // View global view changes
  updateViewBy = v => this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })
  updateView = (view) => {
    const targ = document.getElementById(view)
    const top = (!targ || view === 'default') ? 0 : targ.offsetTop - 90
    window.scrollTo(0, top)
  }
  // budget CRUD
  addBudgetItem = (bi) => this.saveState(bdg.processAddBudgetItem(this.state.budget, bi, colors, this.state.total))
  deleteBudgetItem = (cat, id) => this.saveState(bdg.processDeleteBudgetItem(this.state.budget, cat, id, this.state.total))
  updateBudgetItem = (oldBi, bi) => this.saveState(bdg.processUpdateBudgetItem(this.state.budget, oldBi, bi, colors, this.state.total))

  // accounts CRUD
  addAccount = (ai) => this.saveState(acn.processAddAccount(ai, this.state.accounts))
  deleteAccount = (aId) => this.saveState(acn.processDeleteAccount(aId, this.state.accounts))
  updateAccount = (ai) => this.saveState(acn.processUpdateAccount(ai, this.state.accounts))

  // savings calulator
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
