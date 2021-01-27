import React, { useState, useEffect } from 'react'
import theme from '../../styles/theme'
import { Fade } from '../Transitions'
import Scroll from './Scroll'

const Collapseable = ({ open, message, children, maxHeight }) => {
  const [isOpen, updateIsOpen] = useState(true)
  const [defaultSet, updateDefaultSet] = useState(false)

  useEffect(() => {
    (!defaultSet && open !== null) && updateIsOpen(!open)
    updateDefaultSet(true)
  }, [open, defaultSet])

  const messageStyles = {
    textAlign: 'center',
    color: '#fff',
    margin: '3px auto',
    width: '100%',
    cursor: 'pointer',
    padding: '3px 2px',
    position: 'relative',
    backgroundColor: theme.lightGray
  }

  const switchStyles = {
    fontSize: isOpen ? '1.6rem' : '2.2rem',
    position: 'absolute',
    right: '10px',
    top: isOpen ? '3px' : '1px',
  }

  const displayMessage = message || <p style={messageStyles} onClick={() => updateIsOpen(!isOpen)}>Click to view content <span style={switchStyles}>+</span></p>

  return (

    <span>
      {!isOpen &&
      <p
        onClick={() => updateIsOpen(!isOpen)}
        style={messageStyles}
      > 
        Click to hide content
        <span style={switchStyles}>-</span>
      </p>}
      {!isOpen ? <Fade time={320}><Scroll height={maxHeight || 650}>{children}</Scroll></Fade> : displayMessage}

    </span>
  )
}

export default Collapseable
