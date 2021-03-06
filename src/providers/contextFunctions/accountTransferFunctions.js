import { getObjIndex } from "../../utilities/functions"
import { saveResource } from './storage'

export const processAddAccountTransfer = async (ai, accountTransfers, username, saveState) => {
    console.log(ai, accountTransfers, username, saveState)
    if (username) {
        const response = await saveResource("save", "accounttransfers", ai, username, null)
        if(response && response.data && response.data.length > 0){
            saveState({accountTransfers: [...accountTransfers, {...response.data[0]}]})
        }
    } else {
        saveState({accountTransfers: [...accountTransfers, {...ai, id: Date.now()}]})
    }
}
export const processDeleteAccountTransfer = async (aId, accountTransfers, username, saveState) => {
    if (username) {
        await saveResource("delete", "accounttransfers", null, username, aId)
    }
    saveState({accountTransfers: [...accountTransfers].filter(a => a.id !== aId)})
}
export const processUpdateAccountTransfer = async (ai, accountTransfers, username, saveState) => {
    if (username) {
        await saveResource("put", "accounttransfers", ai, username, ai.id)
    }
    const ind = getObjIndex(accountTransfers, 'id', ai.id)
    let newAccountTransfers = [...accountTransfers]
    newAccountTransfers[ind] = ai
    saveState({accountTransfers: newAccountTransfers})
}