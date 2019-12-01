import React, { useContext, useState } from "react";
import { convert, disRec } from "../../../utilities/convert"; 
import DropDown from "../../interface/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendarAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../../providers/MainContext";
import { recurrence } from '../../../utilities/constants'
import { styles } from './styles'
import SubNav from './SubNav'

const TopBar = ({updateView, step}) => {
  const p = useContext(MainContext);
  const [isOpen, updateIsOpen] = useState(false);

  const changeView = (event, view) => {
    event.preventDefault()
    updateIsOpen(false)
    updateView(view)
  }

  const StTopBar = styles(p, isOpen);

  return (
    <StTopBar>
      <button onClick={()=> updateIsOpen(!isOpen)} className='hamburger'>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className='mainContainer'>
        <p className="logo">
          <FontAwesomeIcon icon={faMoneyBill} />
          &nbsp; Budge-it
        </p>
        <DropDown
          icon={<FontAwesomeIcon icon={faCalendarAlt} />}
          options={recurrence}
          isSet={disRec(p.viewBy)}
          callBack={v => p.updateViewBy(v)}
        />
        <p>{p.amount && convert(p.amount, "w", p.viewBy, "money")}</p>
      </div>
      {isOpen && <SubNav changeView={changeView} p={p} step={step} />}
    </StTopBar>
  );
};

export default TopBar;
