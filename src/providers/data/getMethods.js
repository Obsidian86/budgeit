const getMethods = (provider) => ({
    updateViewBy: provider.updateViewBy,
    updateSavingsTables: provider.updateSavingsTables,
    setDialog: provider.setDialog,
    updateView: provider.updateView,
    saveState: provider.saveState,
    getLink: provider.getLink,
    // Data
    exportData: provider.exportData,
    importData: provider.importData,
    // Memory
    //applyState: provider.applyState,
    // deleteData: provider.deleteData,
    loadData: provider.loadData,
    setUser: provider.setUser,
    logout: provider.logout,
    //loadProfiles: provider.loadProfiles,
    //saveAndNew: provider.saveAndNew,
    //deleteCurrent: provider.deleteCurrent,
    
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
    // snapshots
    addSnapShot: provider.addSnapShot,
    deleteSnapShot: provider.deleteSnapShot
  })

  export default getMethods