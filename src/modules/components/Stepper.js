import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components'

const Stepper = ({ step, getLink, theme, hasSource, hasBudgetItem, hasAccount }) => {
  const textColor = '#fff'
  return (
    <StyledStepper>
      <Link to={getLink('/accounts')} style={{ color: hasAccount ? theme.vBlue : textColor }}>
        <span style={{ borderColor: hasAccount ? theme.vBlue : textColor }}>
          {hasAccount ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
        </span>
        Add account
      </Link>
      <Link to={getLink('/sources')} style={{ color: hasSource ? theme.vBlue : textColor }}>
        <span style={{ borderColor: hasSource ? theme.vBlue : textColor }}>
          {hasSource ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
        </span>
        Add income
      </Link>
      <Link to={getLink('/budget')} style={{ color: hasBudgetItem ? theme.vBlue : textColor }}>
        <span style={{ borderColor: hasBudgetItem ? theme.vBlue : textColor }}>
          {hasBudgetItem ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
        </span>
        Add budget item
      </Link>
    </StyledStepper>
  )
}

const StyledStepper = styled.div`
    margin: 10px 0 30px 0;
    display: flex;
    justify-content: center;
    width: 90%;
    & a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      margin-left: 25px;
      text-align: center;
      & span {
        border: 3px solid  #fff;
        padding-top: 2px;
        height: 18px;
        width: 20px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 5px;
        text-align: center;
      }
    }

    @media screen and (max-width: 560px) {
      width: 96%;
      & a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        & span {
          margin-bottom: 10px;
        }
      }
    }
`

export default Stepper;