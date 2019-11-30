import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faSave, faUserMinus, faBan, faDownload, faUserAlt } from "@fortawesome/free-solid-svg-icons";

const SubNav = ({ changeView, p }) => {
    const [showList, updateShowList] = useState(false)
    const profileList = p.loadProfiles()
    return (
        <div>
            <div style={{ fontSize: '1.2rem', marginTop: '10px' }}>
                {p.profile &&
                    <div style={{ 
                        padding: '22px 0', 
                        borderBottom: '1px solid darkgreen', 
                        width: '100%',
                        backgroundColor: '#555'
                    }}>
                        <span style={{
                            background: 'white',
                            borderRadius: '50%',
                            padding: '6px 7px',
                            color: '#555'
                        }}>
                            <FontAwesomeIcon icon={faUserAlt} /> 
                        </span>
                        &nbsp; {p.profile}
                    </div>
                }

                <button onClick={p.saveAndNew}>
                    <FontAwesomeIcon icon={faSave} />
                    <span>Save current + new</span>
                </button>

                {profileList && <button onClick={() => updateShowList(!showList)}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Load profile</span>
                </button>}

                <div style={{ backgroundColor: '#fff', fontSize: '1rem', textAlign: 'left', width: '100%' }}>
                    {profileList && showList && profileList.map(prof =>
                        <button
                            key={prof}
                            onClick={() => p.loadData(prof)}
                            style={{ color: 'green', paddingLeft: '55px', width: '100%' }}
                        >
                            {prof}
                        </button>
                    )}
                </div>

                <button onClick={() => p.setDialog({
                        open: true,
                        header: 'Delete item',
                        message: <>Are you sure you want to delete this item? <br /> This can not be undone.</>,
                        confirm: () => p.deleteCurrent(p.profile),
                        reject: () => { return null }
                    })}>
                    <FontAwesomeIcon icon={faUserMinus} /> 
                    <span>Delete current</span>
                </button>
                <button onClick={() => p.setDialog({
                        open: true,
                        header: 'Delete item',
                        message: <>Are you sure you want to clear all data? <br /> This can not be undone.</>,
                        confirm: () => p.deleteData(),
                        reject: () => { return null }
                    })}>
                    <FontAwesomeIcon icon={faBan} />
                    <span>Clear all data</span>
                </button>

            </div>
            <nav>
                <a href='/#' onClick={event => changeView(event, 'default')}> 
                    <FontAwesomeIcon icon={faArrowAltCircleRight} /> 
                    <span>Top</span>
                </a>

                <a href='/#' onClick={event => changeView(event, 'savingsModule')}>  
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    <span>Savings calc</span>
                </a>

                <a href='/#' onClick={event => changeView(event, 'accountsModule')}> 
                    <FontAwesomeIcon icon={faArrowAltCircleRight} /> 
                    <span>Accounts</span>
                </a>

                <a href='/#' onClick={event => changeView(event, 'calendarModule')}> 
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    <span>Calendar</span>
                </a>

            </nav>
        </div>
    )
}

export default SubNav