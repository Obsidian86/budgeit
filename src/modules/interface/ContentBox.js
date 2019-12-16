import React, { useState, useEffect, useContext } from 'react'
import ModuleTitle from './ModuleTitle'
import MainContext from '../../providers/MainContext'

const ContentBox = ({ children, title, exClass = '', itemId, exStyles = {} }) => {
  const [isOpen, updateIsOpen] = useState(true)
  const p = useContext(MainContext)

  useEffect(() =>{
    const urlPar = window.location.href.split("#")
    const view = urlPar.length > 1 ? urlPar[1] : null
    view === itemId && p.updateView(itemId)
  })

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
