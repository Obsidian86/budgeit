import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Stepper = ({step, getLink, theme, hasSource, hasBudgetItem, hasAccount}) => {
  const s = {
    container: {
      margin: '12px 0 35px 0',
      display: 'flex',
      justifyContent: 'center',
      width: '90%'
    },
    link: {
      textDecoration: 'none',
      color: '#444',
      fontWeight: 'bold',
      marginLeft: '25px'
    },
    span: {
      border: '3px solid #444',
      paddingTop: '2px',
      height: '18px',
      width: '20px',
      display: 'inline-block',
      borderRadius: '50%',
      marginRight: '5px',
      textAlign: 'center'
    }
  }

  return(
    <div style={s.container}>
      <Link to={getLink('/#default')} style={{...s.link, color: hasSource ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: hasSource ? theme.vBlue : '#444' }}>
          { hasSource ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}
        </span>
        Add income 
      </Link>
      <Link to={getLink('/budget#yourBudgetModule')} style={{...s.link, color: hasBudgetItem ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: hasBudgetItem ? theme.vBlue : '#444' }}>
          { hasBudgetItem ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}</span>
        Add budget item 
      </Link>
      <Link to={getLink('/accounts' )} style={{...s.link, color: hasAccount ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: hasAccount ? theme.vBlue : '#444' }}>
          { hasAccount ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}</span>
        Add account
      </Link>
    </div>
  )
}

export default Stepper;