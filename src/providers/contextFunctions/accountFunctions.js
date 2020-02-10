import { genId, getObjIndex } from "../../utilities/functions"
import { saveResource } from './storage'

export const processAddAccount = async (ai, accounts, username, saveState) => {
    if(!ai.liquid) ai.liquid = false
    const response = await saveResource("save", "accounts", ai, username, null)
    if(response['error']) console.log(response)
    saveState({accounts: [...accounts, {...response.data[0]}]})
}
export const processDeleteAccount = async (aId, accounts, username, saveState) => {
    const response = await saveResource("delete", "accounts", null, username, aId)
    if(response['error']) console.log(response)
    saveState({accounts: [...accounts].filter(a => a.id !== aId)})
}
export const processUpdateAccount = async (ai, accounts, username, saveState) => {
    if(!ai.liquid) ai.liquid = false
    const response = await saveResource("put", "accounts", ai, username, ai.id)
    if(response['error']) console.log(response)
    const ind = getObjIndex(accounts, 'id', ai.id)
    let newAccounts = [...accounts]
    newAccounts[ind] = ai
    saveState({accounts: newAccounts})
}