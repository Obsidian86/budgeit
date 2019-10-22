import React, { useState, useEffect } from 'react'
import theme from '../../styles/theme'

const Collapseable = ({ open, message, children }) => {
    const [isOpen, updateIsOpen] = useState(true)
    const [defaultSet, updateDefaultSet] = useState(false)

    useEffect(() => {
        (!defaultSet && open !== null) && updateIsOpen(open)
        updateDefaultSet(true)
    }, [open, defaultSet])

    const messageStyles = {
        textAlign: 'center',
        padding: '3px',
        cursor: 'pointer',
        backgroundColor: theme.lightGray,
        border: `1px solid ${theme.darkGray}`,
        color: theme.darkGray,
        borderRadius: '5px',
        width: '80%',
        margin: '20px auto'
    }

    const displayMessage = message ?
        message :
        <p style={messageStyles}>Click to view content</p>

    return (
        <span onClick={() => updateIsOpen(true)}>
            {isOpen ? children : displayMessage}
        </span>
    )
}

export default Collapseable