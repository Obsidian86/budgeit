import { convert } from '../../utilities/convert'
import { genId, getObjIndex } from '../../utilities/functions'

export const processAddSource = (newSource = {}, sources = [], amount = 0) => ({ 
    amount: parseFloat(amount || 0) + parseFloat( convert(newSource.amount, newSource.rec, 'w') ),
    incomeSources: [...sources, {...newSource, id: genId()}]
})

export const processDeleteSource = (sourceId, sources, amount) => {
    const ind = getObjIndex(sources, 'id', sourceId)
    const foundSource = { ...sources[ind] }
    return({
        incomeSources: [...sources].filter(s => s.id !== foundSource.id),
        amount: parseFloat(amount) - parseFloat(convert(foundSource.amount, foundSource.rec, 'w'))
    })
}

export const processUpdateSource = (source, sources, amount) => {
    const ind = getObjIndex(sources, 'id', source.id)
    const newSources = [...sources]
    const oldSource = { ...sources[ind] }
    amount = amount - parseFloat(convert(oldSource.amount, oldSource.rec, 'w'))
    amount = amount + parseFloat(convert(source.amount, source.rec, 'w'))
    newSources[ind] = source
    return({
        incomeSources: [...newSources],
        amount
    })

}