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
  checkIfMobile = () => {
    const isMobile = window.innerWidth < 1000
    if(isMobile !== this.state.isMobile) this.setState({isMobile}) 
  }

  componentDidMount = async () => {
    const localUser = localStorage.getItem('user') ? localStorage.getItem('user') : null
    if(localUser) this.setState({profile: localUser}, async () => {
      await this.loadData()
      await this.refreshToken()
    }) 
    if(this.state.globalLoad) this.setState({globalLoad: false})
    window.addEventListener('resize', this.checkIfMobile)
    this.checkIfMobile()
  }
  componentWillUnmount = () => window.removeEventListener('resize', this.checkIfMobile) 
  saveState = newState => this.setState(newState)

  // Data import / export
  importData = (data) => this.saveState({...this.defaultVals, ...data}) 
  exportData = () => conF.exportData(this.state)

  // profile tasks
  setUser = (username) => {
    this.setState({profile: username, loggedIn: true, globalLoad: true},
      async ()=> { 
        await this.loadData()
        this.setState({globalLoad: false})
      }
    )}
  logout = () => {
    localStorage.clear()
    this.setState({...this.defaultVals, globalLoad: false})
  }
  loadData = async () => {
    const hasData = await conF.load(this.state.profile)
    if(hasData) {
      this.setState({...hasData})
    }
  }
  refreshToken = async () => conF.refreshToken(this.state.profile, defaultState, this.saveState)
  // View global view changes
  updateViewBy = v => this.saveState({ viewBy: v });
  setDialog = dialog => this.setState({ dialog })
  updateView = (view, parent) => conF.updateView(view, parent, this.state.lastView, this.saveState)
  getLink = (link) => link 

  // User data
  updateUserData = (data) => conF.updateUserData(data, this.state.profile, this.state.userInfo, this.saveState)

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

  // account transfers
  accTraReqs = (data, fnc) => fnc(data, this.state.accountTransfers, this.state.profile, this.saveState)
  addAccountTransfer = (at) => this.accTraReqs(at, conF.processAddAccountTransfer)
  deleteAccountTransfer = (at) => this.accTraReqs(at, conF.processDeleteAccountTransfer)
  updateAccountTransfer = (at) => this.accTraReqs(at, conF.processUpdateAccountTransfer)

  // savings calulator
  savingsTablesReqs = (data, fnc) => fnc(data, this.state.savingsTable, this.state.savingsTables, this.state.profile, this.saveState)
  addSavingsTables = table => this.savingsTablesReqs(table, conF.addSavingsTables)
  deleteSavingsTables = table => this.savingsTablesReqs(table, conF.deleteSavingsTables)
  addAccountToEstimator = (data) => this.setState({selectedAccount: data ? {...data} : null}, ()=> data && this.updateView('savingsModule'))

  // Snapshots
  snapshotReqs = (data, fnc) => fnc(data, this.state.snapshots, this.state.profile, this.saveState)
  addSnapShot = (data) => this.snapshotReqs(data, conF.addSnapShot)
  deleteSnapShot = (deleteIndex) => this.snapshotReqs(deleteIndex, conF.deleteSnapShot)

  // transactions
  submitTransaction = (transaction, accountData) => 
    conF.submitTransaction(transaction, this.state.profile, this.state.transactions, this.saveState, accountData, this.updateAccount)
  updateTransaction = (transaction, accountData) => 
    conF.updateTransaction(transaction, this.state.profile, this.state.transactions, this.saveState, accountData, this.updateAccount)
  deleteTransaction = (accountData, transaction) =>
    conF.deleteTransaction(accountData, transaction, this.state.profile, this.state.transactions, this.updateAccount, this.saveState)
  loadTransactions = (accountId) =>
    conF.loadTransactions(accountId, this.state.profile, this.state.transactions, this.state.hasNoTransactions, this.saveState)
  
  render = () =>
    <>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.state.globalLoad ?
          <InitLoad />
          : this.props.children
        }
      </MainContext.Provider>
    </>
}

export default MainProvider

const InitLoad = () => {
  return(
    <div style={{'height': '100vh', 'display': 'flex', 'alignItems': 'center', 'fontSize': '1.2rem', 'color': 'green', 'width': '100%', 'justifyContent': 'flex-center'}}>
      <div className="logo" style={{'margin': '0 auto'}}>
          <img src='images/favicon-32x32.png' alt='' style={{'margin': '0 auto', 'display': 'block'}} />
          <p style={{'fontWeight': 'bold', 'width': '100%', 'textAlign': 'center'}}>
            loading...
          </p>
      </div>
    </div>
  )
}