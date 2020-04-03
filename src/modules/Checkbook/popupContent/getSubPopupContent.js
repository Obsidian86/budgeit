import React from 'react'

const getSubPopupContent = (popUp, handleFieldChange, updatePopUp, budget) => {
    let popUpData = <></>
    if( popUp === 'category'){
        popUpData = 
        <div className='sub-pop-up'>
            <span className='pop-up-title'>
                <strong>Choose category</strong>
            </span>
            { Object.keys(budget).map((bi, i) =>
                <div key={i} className='catOption' onClick={
                    () => {
                    handleFieldChange({target: { value: bi, name: 'category'}})
                    updatePopUp(false)
                }}>
                    <span>{bi}</span>
                </div> 
            )}
            { <div className='mt-40'><p className='btn red' onClick={()=> updatePopUp(false)} >Cancel</p></div>}
        </div>
    }

    if( popUp === 'type'){
        popUpData =
        <div className='sub-pop-up'>
            <span className='pop-up-title'>
                <strong>Choose transaction type</strong>
            </span>
            { ['withdrawl', 'deposit'].map((type, i) =>
                <div key={i} className='catOption' onClick={
                    () => {
                    handleFieldChange({target: { value: type, name: 'type'}})
                    updatePopUp(false)
                }}>
                    <span>{type}</span>
                </div> 
            )}
            { <div className='mt-40'><p className='btn red' onClick={()=> updatePopUp(false)} >Cancel</p></div>}
        </div>
    }
    return popUpData
}

export default getSubPopupContent