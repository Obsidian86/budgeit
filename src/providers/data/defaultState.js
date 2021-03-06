import theme from '../../styles/theme'

const defaultState = {
    profile: null,
    isLocalUser: true,
    loggedIn: false,
    globalLoad: true,
    loaded: false,
    amount: null, // income amount set by user
    accounts: [],
    eoyTotal: null,
    eoyLiquid: null,
    viewBy: 'm',
    dialog: { open: false },
    theme: theme,
    budget: {},
    total: 0, // total amount budgeted
    savingsTable: [{ 0: { stAmount: 0, interest: 0, deposit: 0 } }],
    savingsTables: [],
    hasTableData: false,
    incomeSources: [],
    snapshots: [],
    selectedAccount: null,
    transactions: {},
    hasNoTransactions: [],
    lastView: null,
    isMobile: true,
    accountTransfers: []
}

export default defaultState