import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Stepper = ({step, getLink, theme}) => {

  // no step number
  // just check if has acc + has income + has budget item
  // dont display if has all three


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
      <Link to={getLink('/#default')} style={{...s.link, color: step === 0 ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: step === 0 ? theme.vBlue : '#444' }}>
          { step > 0 ? <FontAwesomeIcon icon={faCheck}/> : '1'}
        </span>
        Add income 
      </Link>
      {step !== 0 ? <Link to={getLink('/budget#yourBudgetModule')} style={{...s.link, color: step === 1 ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: step === 1 ? theme.vBlue : '#444' }}>
          { step > 1 ? <FontAwesomeIcon icon={faCheck}/> : '2'}</span>
        Add budget item 
      </Link> :
      <span style={{...s.link, color: step === 1 ? theme.vBlue : '#444'}}>
        <span style={{...s.span, borderColor: step === 1 ? theme.vBlue : '#444' }}>
          { step > 1 ? <FontAwesomeIcon icon={faCheck}/> : '2'}</span>
        Add budget item 
      </span>}
    </div>
  )
}

export default Stepper;