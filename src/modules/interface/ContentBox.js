import React, { useState, useEffect, useContext } from 'react'
import ModuleTitle from './ModuleTitle'
import MainContext from '../../providers/MainContext'

const ContentBox = ({ children, title, exClass = '', itemId, exStyles = {}, hideShrink = true, icon, controls }) => {
  const [isOpen, updateIsOpen] = useState(true)
  const p = useContext(MainContext)

  useEffect(() =>{
    const urlPar = window.location.href.split("#")
    const view = urlPar.length > 1 ? urlPar[urlPar.length - 1] : null
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
  const hideItems = exClass && exClass.includes('hide')
  return (
    <>
    {!hideItems && (title || controls) &&
    <div className='module-header'>
      <div>
        { title && <ModuleTitle title={title} icon={icon} />  }
      </div>
      <div className='module-controls'>
        { controls && controls}
      </div>
    </div>}
    <div className={`contentBox ${exClass}`} style={{...exStyles, alignSelf: !isOpen ? 'flex-start': 'stretch'}} id={itemId}>
      {!hideShrink && <span
        onClick={() => updateIsOpen(!isOpen)}
        style={buttonStyles}
      >{isOpen ? '-' : '+'}
      </span>}
      {isOpen && children}
    </div>
    </>
  )
}

export default ContentBox
