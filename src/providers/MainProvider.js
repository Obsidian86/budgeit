import React from 'react'
import MainContext from './MainContext'
import conF from './contextFunctions'
import Dialog from '../modules/interface/Dialog'
import defaultState from './data/defaultState'
import getMethods from './data/getMethods'
import InitLoad from '../modules/components/InitLoad'

class MainProvider extends React.Component {
  constructor() {
    super()
    this.defaultVals = defaultState
    this.methods = getMethods(this)
    this.state = {
      ...this.defaultVals,
      ...this.methods
    }
  }

  // initialize data
  isMobile = () => window.innerWidth < 1000
  checkIfMobile = () => {
    const isMobile = this.isMobile()
    if (isMobile !== this.state.isMobile) this.setState({ isMobile })
  }

  componentDidMount = async () => {
    const appState = localStorage.getItem('appState')
    appState && this.setState(JSON.parse(appState))

    const localAccount = localStorage.getItem('user') ? localStorage.getItem('user') : null
    if (localAccount) {
      this.setState({
        profile: localAccount,
        isLocalUser: false
      }, async () => {
        await this.loadData()
        if (this.state.profile) {
          await this.refreshToken()
        }
      })
    } else {
      this.setState({
        profile: null,
        isLocalUser: true
      })
    }
    if (this.state.globalLoad) this.setState({ globalLoad: false })
    window.addEventListener('resize', this.checkIfMobile)
    this.checkIfMobile()
  }
  componentWillUnmount = () => window.removeEventListener('resize', this.checkIfMobile)
  saveState = newState => {
    this.setState(newState, () => {
      localStorage.setItem('localExpire', JSON.stringify(Date.now()))
      localStorage.setItem('appState', JSON.stringify(this.state))
    })
  }

  // Data import / export
  importData = (data) => this.saveState({ ...this.defaultVals, ...data })
  exportData = () => conF.exportData(this.state)

  // profile tasks
  setUser = (username) => {
    this.setState({ profile: username, loggedIn: true, globalLoad: true },
      async () => {
        await this.loadData()
        this.setState({ globalLoad: false }, () => this.checkIfMobile())
      }
    )
  }
  logout = () => {
    localStorage.clear()
    this.setState({ ...this.defaultVals, globalLoad: false }, () => {
      this.checkIfMobile()
      this.saveState()
    })
  }
  loadData = async () => {
    if (this.state.profile) {
      const hasData = await conF.load(this.state.profile)
      if (hasData && hasData.profile) {
        this.setState({ ...hasData })
      } else {
        this.logout()
      }
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
  budgetReqs = (data, fnc) => fnc(data, false, this.state.budget, this.state.total, this.state.profile, this.state.accountTransfers, this.saveState)
  addBudgetItem = (bi) => this.budgetReqs(bi, conF.processAddBudgetItem)
  deleteBudgetItem = (cat, id) => this.budgetReqs({ cat, id }, conF.processDeleteBudgetItem)
  updateBudgetItem = (oldBi, bi) => this.budgetReqs({ oldBi, bi }, conF.processUpdateBudgetItem)

  // accounts CRUD
  accountReqs = (data, fnc) => fnc(data, this.state.accounts, this.state.profile, this.saveState)
  addAccount = (ai) => this.accountReqs(ai, conF.processAddAccount)
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
  addAccountToEstimator = (data) => this.setState({ selectedAccount: data ? { ...data } : null }, () => data && this.updateView('savingsModule'))

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

  render = () => {
    if (this.isMobile() !== this.state.isMobile) {
      this.checkIfMobile()
    }
    return (<>
      {this.state.dialog.open && <Dialog data={this.state.dialog} setDialog={this.setDialog} />}
      <MainContext.Provider value={this.state}>
        {this.state.globalLoad ?
          <InitLoad />
          : this.props.children
        }
      </MainContext.Provider>
    </>)
  }
}

export default MainProvider
