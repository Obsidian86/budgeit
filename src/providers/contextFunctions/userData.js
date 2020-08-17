import makeCall from "../../api"

export const updateUserData = async (data, username, userInfo, saveState) => {
    const info = { username, requireAuth: true }
    info.endPoint = 'updateUserData'
    info.method = 'PUT'
    info.body = data
    const response = await makeCall(info)
    if(response && response.data && response.data.length){
        const retData = response.data[0]
        if(retData && response.message === 'Resource updated'){
            let useData = { ...data }
            if(useData['password']) delete useData['password']
            saveState({
                userInfo: { ...userInfo, ...useData }
            })
            return ({success: true})
        }
        return ({success: false})
    } else{
        return ({success: false})
    }
}