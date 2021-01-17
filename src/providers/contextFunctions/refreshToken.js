import { makeCall } from '../../api/apiCall'

export const refreshToken = async (username, defaultState, saveState) => {
    if (!username) return
    const tokens = localStorage.getItem('aKey') ? JSON.parse(localStorage.getItem('aKey')) : null
    if(tokens){
        const refresh = tokens[1]
        const callData = {
            endPoint: 'tokenRefresh',
            username: username,
            method: 'POST',
            body: { "refresh": refresh }
        }
        const response = await makeCall(callData)
        if(response && response.access){
            tokens[0] = response.access
            localStorage.setItem('aKey', JSON.stringify(tokens))
        } else saveState({...defaultState, globalLoad: false}) 
    } else saveState({...defaultState, globalLoad: false}) 
}