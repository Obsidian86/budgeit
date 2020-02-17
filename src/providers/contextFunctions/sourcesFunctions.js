import { convert } from '../../utilities/convert'
import { getObjIndex } from '../../utilities/functions'
import { saveResource } from './storage'

export const processAddSource = async (data, sources, amount, username, saveState) => {
    const response = await saveResource('save', 'sources', data, username, null)
    if(response && response.data && response.data.length > 0){
        const newSource = response.data[0]
        newSource['category'] = 'income'
        saveState({ 
            amount: parseFloat(amount || 0) + parseFloat( convert(newSource.amount, newSource.rec, 'w') ),
            incomeSources: [...sources, {...newSource}]
        })
    }
}

export const processDeleteSource =  async(sourceId, sources, amount, username, saveState) => {
    const response = await saveResource('delete', 'sources', null, username, sourceId)
    if(response && response.data && response.data.length > 0){
        const ind = getObjIndex(sources, 'id', response.data[0].id)
        const foundSource = { ...sources[ind] }
        saveState({
            incomeSources: [...sources].filter(s => (s.id + "") !== (foundSource.id + "")),
            amount: parseFloat(amount) - parseFloat(convert(foundSource.amount, foundSource.rec, 'w'))
        })
    }
}

export const processUpdateSource = async(source, sources, amount, username, saveState) => {
    const response = await saveResource('put', 'sources', source, username, source.id)
    if(response && response.data && response.data.length > 0){
        const updateSource = response.data[0]
        const ind = getObjIndex(sources, 'id', updateSource.id)
        const newSources = [...sources]
        const oldSource = { ...sources[ind] }
        amount = amount - parseFloat(convert(oldSource.amount, oldSource.rec, 'w'))
        amount = amount + parseFloat(convert(updateSource.amount, updateSource.rec, 'w'))
        updateSource['category'] = 'income'
        newSources[ind] = updateSource
        saveState({
            incomeSources: [...newSources],
            amount
        })
    }
}