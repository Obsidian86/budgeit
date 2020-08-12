const getMethods = (provider) => ({
    updateViewBy: provider.updateViewBy,
    setDialog: provider.setDialog,
    updateView: provider.updateView,
    saveState: provider.saveState,
    getLink: provider.getLink,
    refreshToken: provider.refreshToken,
    // Memory
    loadData: provider.loadData,
    setUser: provider.setUser,
    logout: provider.logout,
    exportData: provider.exportData,
    /********* Resources ***********/
    // Budget CRUD
    addBudgetItem: provider.addBudgetItem,
    deleteBudgetItem: provider.deleteBudgetItem,
    updateBudgetItem: provider.updateBudgetItem,
    // Source CRUD
    addSource: provider.addSource,
    deleteSource: provider.deleteSource,
    updateSource: provider.updateSource,
    // Accounts CRUD
    addAccount: provider.addAccount,
    deleteAccount: provider.deleteAccount,
    updateAccount: provider.updateAccount,
    addAccountToEstimator: provider.addAccountToEstimator,
    // Account transfer CRUD
    addAccountTransfer: provider.addAccountTransfer,
    updateAccountTransfer: provider.updateAccountTransfer,
    deleteAccountTransfer: provider.deleteAccountTransfer,
    // Snapshots
    addSnapShot: provider.addSnapShot,
    deleteSnapShot: provider.deleteSnapShot,
    // Savings tables
    addSavingsTables: provider.addSavingsTables,
    deleteSavingsTables: provider.deleteSavingsTables,
    // transactions
    submitTransaction: provider.submitTransaction,
    loadTransactions: provider.loadTransactions,
    deleteTransaction: provider.deleteTransaction,
    updateTransaction: provider.updateTransaction
  })

  export default getMethods