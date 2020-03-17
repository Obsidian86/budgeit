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
    // Snapshots
    addSnapShot: provider.addSnapShot,
    deleteSnapShot: provider.deleteSnapShot,
    // Savings tables
    addSavingsTables: provider.addSavingsTables,
    deleteSavingsTables: provider.deleteSavingsTables,
  })

  export default getMethods