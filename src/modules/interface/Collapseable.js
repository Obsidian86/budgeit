import React, { useState, useEffect } from 'react'
import theme from '../../styles/theme'

const Collapseable = ({ open, message, children }) => {
    const [isOpen, updateIsOpen] = useState(true)
    const [defaultSet, updateDefaultSet] = useState(false)

    useEffect(() => {
        (!defaultSet && open !== null) && updateIsOpen(!open)
        updateDefaultSet(true)
    }, [open, defaultSet])

    const messageStyles = {
        textAlign: 'center',
        padding: '8px 7px',
        cursor: 'pointer',
        backgroundColor: theme.lightGray,
        border: `1px solid ${theme.darkGray}`,
        color: theme.darkGray,
        borderRadius: '5px',
        width: '85%',
        margin: '20px auto'
    }

    const displayMessage = message ?
        message :
        <p style={messageStyles} onClick={() => updateIsOpen(!isOpen) }>Click to view content</p>

    return (
        <span>
            { !isOpen && <p 
                onClick={() => updateIsOpen(!isOpen) }
                style={{
                    padding: "0",
                    textAlign: 'center',
                    color: "#fff",
                    margin: '3px auto',
                    width: '98%',
                    cursor: 'pointer',
                    backgroundColor: theme.lightGray
                }}>Click to hide content
            </p>}
            {!isOpen ? children : displayMessage}
        </span>
    )
}

export default Collapseable