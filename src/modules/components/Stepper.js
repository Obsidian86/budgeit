import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Stepper = ({step, getLink, theme, hasSource, hasBudgetItem, hasAccount}) => {
  const textColor = '#fff'
  const s = {
    container: {
      margin: '10px 0 50px 0',
      display: 'flex',
      justifyContent: 'center',
      width: '90%'
    },
    link: {
      textDecoration: 'none',
      color: textColor,
      fontWeight: 'bold',
      marginLeft: '25px',
      textAlign: 'center'
    },
    span: {
      border: '3px solid ' + textColor,
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
      <Link to={getLink('/accounts' )} style={{...s.link, color: hasAccount ? theme.vBlue : textColor}}>
        <span style={{...s.span, borderColor: hasAccount ? theme.vBlue : textColor }}>
          { hasAccount ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}</span>
        Add account
      </Link>
      <Link to={getLink('/sources')} style={{...s.link, color: hasSource ? theme.vBlue : textColor}}>
        <span style={{...s.span, borderColor: hasSource ? theme.vBlue : textColor }}>
          { hasSource ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}
        </span>
        Add income 
      </Link>
      <Link to={getLink('/budget')} style={{...s.link, color: hasBudgetItem ? theme.vBlue : textColor}}>
        <span style={{...s.span, borderColor: hasBudgetItem ? theme.vBlue : textColor }}>
          { hasBudgetItem ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}</span>
        Add budget item 
      </Link>
    </div>
  )
}

export default Stepper;