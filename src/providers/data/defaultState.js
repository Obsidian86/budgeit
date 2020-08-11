import theme from '../../styles/theme'

const defaultState = {
    profile: null,
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
    accountTransfers: [
        {id: 5, amount: '350.23', date: '8-13-2020', fromAccount: '3', toAccount: '4', rec: 'm'},
        {id: 1, amount: '350.23', date: '8-15-2020', fromAccount: '3', toAccount: '4', rec: 'm'},
        {id: 2, amount: '350.23', date: '8-16-2020', fromAccount: '3', toAccount: '4', rec: 'm'},
        {id: 3, amount: '350.23', date: '8-17-2020', fromAccount: '4', toAccount: '3', rec: 'm'},
        {id: 4, amount: '350.23', date: '8-18-2020', fromAccount: '4', toAccount: '3', rec: 'm'},
    ]
}

export default defaultState