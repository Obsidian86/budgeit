export const endPoints = {
    token: () => 'api/token/',
    tokenRefresh: () => 'api/token/refresh/',
    // add user data + get data 1 user + delete user
    getUser: (username) => `users/userdata/${username}/`,
    // login
    createUser: (username) => `users/userdata/${username}/`,
    // create, delete, update data for user
    createSource: (username, targetParam) => `users/sources/${username}/${targetParam}/`,
    editSource: (username, targetParam, id) => `users/sources/${username}/${targetParam}/${id}/`,
    allUserData: () => 'auth/allusers/'
}
