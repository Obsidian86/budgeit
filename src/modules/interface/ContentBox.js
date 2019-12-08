import React, { useState } from 'react'
import ModuleTitle from './ModuleTitle'

const ContentBox = ({ children, title, exClass = '', itemId, exStyles = {} }) => {
  const [isOpen, updateIsOpen] = useState(true)
  const buttonStyles = {
    fontSize: '3rem',
    display: 'block',
    textAlign: 'center',
    cursor: 'pointer',
    color: 'darkgray',
    top: '10px',
    right: '12px',
    position: 'absolute',
    width: '40px',
    height: '40px',
    marginTop: isOpen ? '-5px' : '0'
  }
  return (
    <div className={`contentBox ${exClass}`} style={{...exStyles, alignSelf: !isOpen ? 'flex-start': 'stretch'}} id={itemId}>
      <span
        onClick={() => updateIsOpen(!isOpen)}
        style={buttonStyles}
      >{isOpen ? '-' : '+'}
      </span>
      <ModuleTitle title={title} />
      {isOpen && children}
    </div>
  )
}

export default ContentBox
