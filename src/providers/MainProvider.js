import React from 'react'
import MainContext from './MainContext'
import { colors } from '../styles/colors'
import * as mem from './contextFunctions/storage'
import * as bdg from './contextFunctions/budgetFunctions'
import * as src from './contextFunctions/sourcesFunctions'
import * as acn from './contextFunctions/accountFunctions'
import * as vFn from './contextFunctions/viewFunctions'
import Dialog from '../modules/interface/Dialog'
import defaultState from './data/defaultState'
import getMethods from './data/getMethods'

class MainProvider extends React.Component {
  constructor () {
    super()
    this.defaultVals = defaultState
    this.methods = getMethods(this)
    this.state = {
      ...this.defaultVals,
      ...this.methods
    }
  }

  // initialize data
  componentDidMount = () => this.loadData()
  saveState = newState => this.setState(newState, this.applyState)
  applyState = () => {
    const profile = mem.save(this.state, this.state.profile)
    if(!this.state.profile) this.setState({profile}) 
  }

  // Data import / export
  importData = (data) => this.saveState({...this.defaultVals, ...data}) 
  exportData = () => {
    const { profile, amount, accounts, budget, total, savingsTable, incomeSources, snapshots } = this.state
    return({ profile, amount, accounts, budget, total, savingsTable, incomeSources, snapshots })
  }
  // profile tasks
  deleteData = () => {
    mem.deleteData()
    this.setState(this.defaultVals)
  }
  deleteCurrent = (profile) => {
    mem.deleteCurrent(profile)
    this.setState({...this.defaultVals})
  }
  loadData = async (profile) => {
    const hasData = await mem.load('test22')
    if(hasData) this.setState(hasData)
  }

  loadProfiles = () => mem.getProfiles()

  saveAndNew = () => {
    const profile = mem.saveAndNew(this.state, this.state.profile)
    this.setState({...this.defaultVals, profile})
  }

  // View global view changes
  updateViewBy = v => this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })
  updateView = (view, parent) => vFn.updateView(view, parent, this.state.lastView, this.saveState)
  getLink = (link) => link 

  // Income sources
  sourceReqs = (data, fnc) => fnc(data, this.state.incomeSources, this.state.amount, this.state.profile, this.saveState)
  addSource = source => this.sourceReqs(source, src.processAddSource)
  deleteSource = sourceId => this.sourceReqs(sourceId, src.processDeleteSource)
  updateSource = newSource => this.sourceReqs(newSource, src.processUpdateSource)

  // budget CRUD
  budgetReqs = (data, fnc) => fnc(data, false, this.state.budget, this.state.total, this.state.profile, this.saveState)
  addBudgetItem = (bi) => this.budgetReqs(bi, bdg.processAddBudgetItem)
  deleteBudgetItem = (cat, id) => this.budgetReqs({cat, id}, bdg.processDeleteBudgetItem)
  updateBudgetItem = (oldBi, bi) => this.budgetReqs({oldBi, bi}, bdg.processUpdateBudgetItem)

  // accounts CRUD
  accountReqs = (data, fnc) => fnc(data, this.state.accounts, this.state.profile, this.saveState)
  addAccount = (ai) =>  this.accountReqs(ai, acn.processAddAccount)
  deleteAccount = (aId) => this.accountReqs(aId, acn.processDeleteAccount)
  updateAccount = (ai) => this.accountReqs(ai, acn.processUpdateAccount)

  // savings calulator
  updateSavingsTables = (savingsTable) => this.saveState({ savingsTable: savingsTable })
  addAccountToEstimator = (data) => this.setState({selectedAccount: data ? {...data} : null}, ()=> data && this.updateView('savingsModule'))

  // Snapshots
  addSnapShot = (data) => this.saveState({ snapshots: [...this.state.snapshots, {...data}]})
  deleteSnapShot = (deleteIndex) => this.saveState({ snapshots: [...this.state.snapshots.filter((it, ind) => deleteIndex !== ind) ]})

  render = () =>
    <>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider
