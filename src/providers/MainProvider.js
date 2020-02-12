import React from 'react'
import MainContext from './MainContext'
import conF from './contextFunctions'
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
    console.log('check token here')
    const profile = conF.save(this.state, this.state.profile)
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
    conF.deleteData()
    this.setState(this.defaultVals)
  }
  deleteCurrent = (profile) => {
    conF.deleteCurrent(profile)
    this.setState({...this.defaultVals})
  }
  loadData = async () => {
    const hasData = await conF.load('test22')
    if(hasData) this.setState(hasData)
  }

  loadProfiles = () => conF.getProfiles()

  saveAndNew = () => {
    const profile = conF.saveAndNew(this.state, this.state.profile)
    this.setState({...this.defaultVals, profile})
  }

  // View global view changes
  updateViewBy = v => this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })
  updateView = (view, parent) => conF.updateView(view, parent, this.state.lastView, this.saveState)
  getLink = (link) => link 

  // Income sources
  sourceReqs = (data, fnc) => fnc(data, this.state.incomeSources, this.state.amount, this.state.profile, this.saveState)
  addSource = source => this.sourceReqs(source, conF.processAddSource)
  deleteSource = sourceId => this.sourceReqs(sourceId, conF.processDeleteSource)
  updateSource = newSource => this.sourceReqs(newSource, conF.processUpdateSource)

  // budget CRUD
  budgetReqs = (data, fnc) => fnc(data, false, this.state.budget, this.state.total, this.state.profile, this.saveState)
  addBudgetItem = (bi) => this.budgetReqs(bi, conF.processAddBudgetItem)
  deleteBudgetItem = (cat, id) => this.budgetReqs({cat, id}, conF.processDeleteBudgetItem)
  updateBudgetItem = (oldBi, bi) => this.budgetReqs({oldBi, bi}, conF.processUpdateBudgetItem)

  // accounts CRUD
  accountReqs = (data, fnc) => fnc(data, this.state.accounts, this.state.profile, this.saveState)
  addAccount = (ai) =>  this.accountReqs(ai, conF.processAddAccount)
  deleteAccount = (aId) => this.accountReqs(aId, conF.processDeleteAccount)
  updateAccount = (ai) => this.accountReqs(ai, conF.processUpdateAccount)

  // savings calulator
  updateSavingsTables = table => conF.updateSavingsTables(table, this.state.hasTableData, this.state.profile, this.saveState)
  addAccountToEstimator = (data) => this.setState({selectedAccount: data ? {...data} : null}, ()=> data && this.updateView('savingsModule'))

  // Snapshots
  snapshotReqs = (data, fnc) => fnc(data, this.state.snapshots, this.state.profile, this.saveState)
  addSnapShot = (data) => this.snapshotReqs(data, conF.addSnapShot)
  deleteSnapShot = (deleteIndex) => this.snapshotReqs(deleteIndex, conF.deleteSnapShot)

  render = () =>
    <>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    </>
}

export default MainProvider
