import { getObjIndex } from "../../utilities/functions"
import { saveResource } from './storage'

export const processAddAccount = async (ai, accounts, username, saveState) => {
    if (!ai.liquid) ai.liquid = false
    if (!username) {
        saveState({ accounts: [...accounts, { ...ai, id: Date.now() }] })
    } else {
        const response = await saveResource("save", "accounts", ai, username, null)
        if (response && response.data && response.data.length > 0) {
            saveState({ accounts: [...accounts, { ...response.data[0] }] })
        }
    }
}
export const processDeleteAccount = async (aId, accounts, username, saveState) => {
    if (username) {
        await saveResource("delete", "accounts", null, username, aId)
    }
    saveState({ accounts: [...accounts].filter(a => a.id !== aId) })
}
export const processUpdateAccount = async (ai, accounts, username, saveState) => {
    if (!ai.liquid) ai.liquid = false
    if (username) {
        await saveResource("put", "accounts", ai, username, ai.id)
    }
    const ind = getObjIndex(accounts, 'id', ai.id)
    let newAccounts = [...accounts]
    newAccounts[ind] = ai
    saveState({ accounts: newAccounts })
}