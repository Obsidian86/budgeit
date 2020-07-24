import { endPoints } from './endPoints'

let backendUrl = "https://06designs.com/";
if(window.location.href.includes(':3000')) backendUrl = "http://localhost:8000/";

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
    return fetch(backendUrl + url, requestData)
    .then(res => res.json())
    .then(async (res) => {
        let mainResp
        if((res.code && res.code === 'token_not_valid') || (res.status && res.status === 401)){
            const tokens = localStorage.getItem('aKey') ? JSON.parse(localStorage.getItem('aKey')) : null
            if(tokens && username){
                const refresh = tokens[1]
                const getResponse = await fetch(backendUrl + 'api/token/refresh/', {
                    headers:  { 'Content-Type': "application/json" },
                    method: 'POST',
                    body: JSON.stringify({ "refresh": refresh })
                })
                const response = await getResponse.json()
                if(response && response.access){
                    tokens[0] = response.access
                    localStorage.setItem('aKey', JSON.stringify(tokens))
                    requestData.headers['Authorization'] = `Bearer ${response.access}`
                }
                const newResp = await fetch(backendUrl + url, requestData)
                const respData = await newResp.json()
                return mainResp = respData
            }
        } else {
            mainResp = res
        }
        return(mainResp)
    })
    .catch(() => {
        return null
    })
}