import React from 'react'

const getSubPopupContent = (popUp, handleFieldChange, updatePopUp, budget, formData, accountType) => {
    const accountActions = accountType && accountType === 'Credit'
        ? ['payment', 'charge']
        : ['withdraw', 'deposit']

    const iterateItems = popUp === 'category' ? Object.keys(budget) : accountActions
    if(accountType !== 'Credit' && !formData.id && popUp !== 'category'){
        iterateItems.push('adjustment')
    }

    const useTitle = popUp === 'category' ? 'Choose category' : 'Choose transaction type'

    let dTrack = 0
    const displayList = iterateItems.map((itItem, i) => {
        if(dTrack > 2) dTrack = 0
        else dTrack ++
        return(
            <div key={i} className={`catOption ${ dTrack >= 2 ? 'dark' : ''}`} onClick={
                () => {
                handleFieldChange({target: { value: itItem, name: popUp}})
                updatePopUp(false)
            }}>
                <span>{itItem}</span>
            </div>
        ) 
    })

    return (
    <div className='sub-pop-up'>
        <span className='pop-up-title'>
            <strong>{useTitle}</strong>
        </span>
        <div className='cat-list-options'>
            {displayList}
        </div>
        {
            <div className='mt-40 right btn-group'>
                <p className='btn red' onClick={()=> updatePopUp(false)} >Cancel</p>
            </div>
        }
    </div>
    )
}

export default getSubPopupContent