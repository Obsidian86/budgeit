import React, { useContext } from "react";
import { convert, disRec } from "../../../utilities/convert"; 
import DropDown from "../../interface/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../../providers/MainContext";
import { recurrence } from '../../../utilities/constants'
import { styles } from './styles'

const TopBar = ({ isLoggedIn, sideBarOpen, updateSideBarOpen, isMobile}) => {
  const p = useContext(MainContext);
  const StTopBar = styles(p, isLoggedIn, isMobile);
  return (
    <>
      <StTopBar>
        {isMobile && <button onClick={()=> updateSideBarOpen(!sideBarOpen)} className='hamburger' aria-label='Menu toggle'>
          <FontAwesomeIcon icon={faBars} />
        </button>}
        <div className='mainContainer'>
          <span className="logo">
            <img src='images/favicon-32x32.png' alt='' />
            <p>Budge-it</p>
          </span>
           <DropDown
            styles={{borderTop: '5px solid transparent' }}
            icon={<FontAwesomeIcon icon={faCalendarAlt} />}
            options={recurrence}
            isSet={disRec(p.viewBy)}
            callBack={v => p.updateViewBy(v)}
          />
            <p>{p.amount ? convert(p.amount, "w", p.viewBy, "money") : '$0'}</p> 
        </div>
      </StTopBar>
    </>
  );
};

export default TopBar;
