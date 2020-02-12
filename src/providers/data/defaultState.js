import theme from '../../styles/theme'

const defaultState = {
    profile: null,
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
    hasTableData: false,
    incomeSources: [],
    snapshots: [],
    selectedAccount: null,
    lastView: null
}

export default defaultState