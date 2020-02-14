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
    console.log(requestData)
    return fetch('https://bgt-bck.herokuapp.com/' + url, requestData)
    .then(res => res.json())
    .then(res => {
        return(res)
    })
    .catch(err => console.log(err))
}