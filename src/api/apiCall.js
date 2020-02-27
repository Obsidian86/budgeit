import { endPoints } from './endPoints'

export const makeCall = async (info) => {
    const { endPoint, username=null, id=null, targetParam=null, method='GET', requireAuth=false, body } = info
    const url = endPoints[endPoint](...[username, targetParam, id]) || null
    const headers = { 'Content-Type': "application/json" }
    if(requireAuth) {
        const token = localStorage.getItem('aKey') ? localStorage.getItem('aKey') : null
        if (token) headers['Authorization'] = `Bearer ${JSON.parse(token)[0]}`
    }
    let requestData = {
        method: method,
        mode: 'cors',
        headers: headers,
    }
    if(body) requestData["body"] = JSON.stringify(body)
    return fetch('https://bgt-bck.herokuapp.com/' + url, requestData)
    .then(res => res.json())
    .then(async (res) => {
        let mainResp
        if((res.code && res.code === 'token_not_valid') || (res.status && res.status === 401)){
            alert('Getting new Token ' + JSON.stringify(res))
            const tokens = localStorage.getItem('aKey') ? JSON.parse(localStorage.getItem('aKey')) : null
            if(tokens && username){
                const refresh = tokens[1]
                const response = await fetch('https://bgt-bck.herokuapp.com/api/token/refresh/', {
                    headers:  { 'Content-Type': "application/json" },
                    mode: 'cors',
                    body: { "refresh": refresh }
                })
                if(response && response.access){
                    tokens[0] = response.access
                    localStorage.setItem('aKey', JSON.stringify(tokens))
                    alert('updated token in api call')
                }
                const newResp = await fetch('https://bgt-bck.herokuapp.com/' + url, requestData)
                const respData = await newResp.json()
                alert('fetchafterrefresh: ', JSON.stringify(respData))
                return mainResp = respData
            }
        } else {
            mainResp = res
        }
        return(mainResp)
    })
    .catch(err => alert(JSON.stringify(err) ))
}