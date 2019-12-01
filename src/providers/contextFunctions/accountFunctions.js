import { genId, getObjIndex } from "../../utilities/functions"

export const processAddAccount = (ai, accounts) => {
    return {accounts: [...accounts, {...ai, id: genId()}]}
}
export const processDeleteAccount = (aId, accounts) => {
    return {accounts: [...accounts].filter(a => a.id !== aId)}
}
export const processUpdateAccount = (ai, accounts) => {
    const ind = getObjIndex(accounts, 'id', ai.id)
    let newAccounts = [...accounts]
    newAccounts[ind] = ai
    return {accounts: newAccounts}
}