import React, { useContext, useState } from "react";
import { convert, disRec } from "../../../utilities/convert"; 
import DropDown from "../../interface/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendarAlt, faBars, faSave } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../../providers/MainContext";
import { recurrence } from '../../../utilities/constants'
import { styles } from './styles'

const SubNav = ({changeView, p}) => {
  const [showList, updateShowList] = useState(false)
  const profileList = p.loadProfiles()
  return(
    <div>
      <div style={{fontSize: '1.2rem', marginTop: '1px'}}>
        {p.profile && <div style={{padding: '15px', borderBottom: '1px solid darkgreen'}}>Current profile: {p.profile}</div>}
        <button onClick={p.saveAndNew}>
          <FontAwesomeIcon icon={faSave} /> 
          <span>Save current + new</span>
        </button>
        
        {profileList && <button onClick={()=> updateShowList(!showList)}>
          <FontAwesomeIcon icon={faSave} />
          <span>Load profile</span>
        </button>}
        <div style={{backgroundColor: '#fff', fontSize: '.9rem', textAlign: 'left', width: '100%'}}>
          { profileList && showList && profileList.map(prof => 
              <button 
                key={prof} 
                onClick={()=> p.loadData(prof)}
                style={{ color: 'green', paddingLeft: '25px', width: '100%' }}
              >
                  {prof}
              </button>
            )}
        </div>
        <button onClick={()=> p.deleteCurrent(p.profile)}>  
          <FontAwesomeIcon icon={faSave} /> <span>Delete current</span>
        </button>
        <button onClick={() => p.deleteData()} ><FontAwesomeIcon icon={faSave} /> <span>Clear all data</span></button>
      </div>
      <nav>
        <a href='/#' onClick={event=> changeView(event, 'default')}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Dashboard</span>
        </a> 
        <a href='/#' onClick={event=> changeView(event, 'calendar')}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Calendar</span>
        </a>
      </nav>
    </div>
  )
}

const TopBar = ({updateView}) => {
  const p = useContext(MainContext);
  const [isOpen, updateIsOpen] = useState(true);

  const changeView = (event, view) => {
    event.preventDefault()
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

      {isOpen && <SubNav changeView={changeView} p={p} />}
    </StTopBar>
  );
};

export default TopBar;
