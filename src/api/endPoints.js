export const endPoints = {
    // login + get token
    token: () => 'api/token/',
    tokenRefresh: () => 'api/token/refresh/',
    // add user data + get data 1 user + delete user
    getUser: (username) => `users/userdata/${username}/`,
    // Create user
    createUser: () => `users/user/createuser/`,
    // create, delete, update data for user
    createSource: (username, targetParam) => `users/sources/${username}/${targetParam}/`,
    editSource: (username, targetParam, id) => `users/sources/${username}/${targetParam}/${id}/`,
    allUserData: () => 'auth/allusers/',

    // transactions
    newTransaction: (username) => `users/transactions/${username}/`,
    loadTransactions: (username, targetParam) => `users/transactions/${username}/${targetParam}/`,
    deleteTransaction: (username, targetParam, id) => `users/transactions/${username}/${id}/${targetParam}/`
}
