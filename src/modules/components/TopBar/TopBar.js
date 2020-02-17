import React, { useContext, useState } from "react";
import { convert, disRec } from "../../../utilities/convert"; 
import DropDown from "../../interface/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../../providers/MainContext";
import { recurrence } from '../../../utilities/constants'
import { styles } from './styles'
import SubNav from './SubNav'

const TopBar = ({updateView, step, Link, isLoggedIn}) => {
  const p = useContext(MainContext);
  const [isOpen, updateIsOpen] = useState(false)
  const changeView = (event, view) => {
    if(event) event.preventDefault()
    updateIsOpen(false)
    updateView(view)
  }
  const StTopBar = styles(p, isOpen, isLoggedIn);

  const overlay = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.8)',
    zIndex: '1'
  }

  return (
    <>
      <StTopBar>
        {isLoggedIn && <button onClick={()=> updateIsOpen(!isOpen)} className='hamburger' aria-label='Menu toggle'>
          <FontAwesomeIcon icon={faBars} />
        </button>}
        <div className='mainContainer'>
          <span className="logo">
            <img src='images/favicon-32x32.png' alt='' />
            <p>Budge-it</p>
          </span>
          {isLoggedIn && <DropDown
            icon={<FontAwesomeIcon icon={faCalendarAlt} />}
            options={recurrence}
            isSet={disRec(p.viewBy)}
            callBack={v => p.updateViewBy(v)}
          />}
          {isLoggedIn && <p>{p.amount ? convert(p.amount, "w", p.viewBy, "money") : '$0'}</p>}
        </div>
        {isOpen && isLoggedIn && <SubNav changeView={changeView} p={p} step={step} Link={Link} toggleNav={()=>updateIsOpen(!isOpen)} />}
      </StTopBar>
      {isOpen && isLoggedIn && <div style={overlay} onClick={()=> updateIsOpen(!isOpen)}></div>}
    </>
  );
};

export default TopBar;
