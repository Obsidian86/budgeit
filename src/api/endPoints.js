export const endPoints = {
    // login + get token
    token: () => 'api/token/',
    tokenRefresh: () => 'api/token/refresh/',
    // add user data + get data 1 user + delete user
    getUser: (username) => `budget-api/userdata/${username}/`,
    // Create user
    createUser: () => `budget-api/user/createuser/`,
    // Update user
    updateUserData: (username) => `budget-api/userdata/${username}/`,
    // create, delete, update data for user
    createSource: (username, targetParam) => `budget-api/sources/${username}/${targetParam}/`,
    editSource: (username, targetParam, id) => `budget-api/sources/${username}/${targetParam}/${id}/`,
    allUserData: () => 'auth/allusers/',
    // transactions
    newTransaction: (username) => `budget-api/transactions/${username}/`,
    loadTransactions: (username, targetParam, id) => `budget-api/transactions/${username}/${targetParam}/${id}/`,
    deleteTransaction: (username, targetParam, id) => `budget-api/transactions/${username}/${id}/${targetParam}/`
}
