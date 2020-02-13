import { makeCall } from '../../api/apiCall'

export const refreshToken = async (username) => {
    const tokens = localStorage.getItem('aKey') ? JSON.parse(localStorage.getItem('aKey')) : null
    if(tokens){
        const refresh = tokens[1]
        const expire = parseInt(tokens[2]) + 600000
        if(Date.now() > expire){
        const callData = {
            endPoint: 'tokenRefresh',
            username: username,
            method: 'POST',
            body: { "refresh": refresh }
        }
        const response = await makeCall(callData)
        if(response.access){
            tokens[0] = response.access
            localStorage.setItem('aKey', JSON.stringify(tokens))
        }
        }

    } else this.setState(this.defaultVals) 
}