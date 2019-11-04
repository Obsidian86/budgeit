import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Fade } from '../Transitions';
import { up } from '../../utilities/convert'

const getDisplay = (isSet, options) => {
    let val = isSet
    for(let i=0; i< options.length; i++) {
      if(options[i]['v'] === isSet){
        val = options[i]['d']
        break
      }
    }
    return up(val)
}

const DropDown = ({ options, callBack, isSet, icon, styles }) => {
  const [open, updateOpen] = useState(false);

  const forceClose = () => {
    document.removeEventListener('click', forceClose)
    updateOpen(false)
  }

  const toggle = () => {
    if(open) return forceClose() 
    document.addEventListener('click', forceClose)
    updateOpen(true) 
  }

  const StDiv = styled.ul`
    border-bottom: 1px solid;
    box-shadow: ${open ? "0 3px 5px #c4c4c4" : ""};
    position: relative;
    padding: 10px 20px;
    cursor: pointer;
    & ul {
      z-index: 1;
      list-style-type: none;
      list-style-position: outside;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      box-shadow: ${open ? "0 5px 5px #c4c4c4" : ""};
      & li {
        padding: 13px 10px;
        background-color: #fff;
        &:hover {
          color: #fff;
          cursor: pointer;
          background-color: #c3c3c3;
        }
      }
    }
    ${styles}
  `; 

  return (
    <StDiv onClick={() => toggle() } >
      {icon && <>{icon} &nbsp;</>}
      <span>{isSet ? getDisplay(isSet, options) : "Pick one"}</span>
      <Fade time={120}>
        {open && <ul >
          {options.map((o, i) => <li
                key={i}
                onClick={() => {
                  toggle(false);
                  callBack && callBack(o.v);
                }}
              > {up(o.d)} </li> )}
        </ul>}
      </Fade>
      &nbsp;&nbsp;
      <FontAwesomeIcon
        icon={faCaretDown}
        style={{
          position: "absolute",
          right: "10px"
        }}
      />
    </StDiv>
  );
};

export default DropDown;
