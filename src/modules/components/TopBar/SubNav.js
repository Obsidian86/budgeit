import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUserMinus, faBan, faDownload, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from '../../../styles/colors'

const SubNav = ({ changeView, p, step, Link }, props) => {
    const [showList, updateShowList] = useState(false)
    const profileList = p.loadProfiles()
    const s = {
        fontSize: { fontSize: '1.2rem' },
        profile: { 
            cursor: 'pointer',
            padding: '16px 0', 
            borderBottom: '1px solid darkgreen', 
            width: '100%',
            backgroundColor: '#555'
        },
        profName: {marginLeft: '-5px', width: '87%', paddingRight: '20px'},
        profImage: {
            background: 'white',
            borderRadius: '50%',
            padding: '4px 5px',
            color: '#555'
        },
        profList: { backgroundColor: '#fff', fontSize: '1rem', textAlign: 'left', width: '100%' },
        profListItem: { color: 'green', paddingLeft: '55px', width: '100%' }
    }
    return (
        <div>
            <div style={s.fontSize}>
                {p.profile &&
                    <div 
                        style={s.profile}
                        onClick={() => p.setDialog({
                            open: true,
                            header: 'Rename profile',
                            message: 
                                <>
                                    <input 
                                        type='text' 
                                        defaultValue={p.profile} 
                                        id='newProfileName' 
                                        style={s.profName}>
                                    </input>
                                </>,
                            confirm: () => {
                                let newProfile = document.getElementById('newProfileName').value
                                newProfile && newProfile.replace(' ', '') !== '' && newProfile !== p.profile && p.saveState({profile: newProfile})
                            },
                            reject: () => { return null },
                            yesText: 'Change'
                        })}
                    >
                        <span style={s.profImage}>
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

                <div style={s.profList}>
                    {profileList && showList && profileList.map(prof =>
                        <button
                            key={prof}
                            onClick={() => p.loadData(prof)}
                            style={s.profListItem}
                        > {prof} </button>
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
                <Link to='/calendar#snapshots' style={{borderLeft: `5px solid black`}} ><span>Home/Sources</span>

                </Link>
                <a href='/#' 
                    onClick={event => changeView(event, 'default')}
                    style={{borderLeft: `5px solid ${colors[0]}`}}
                > 
                    <span>Home/Sources</span>
                </a>

                <a href='/#' onClick={event => changeView(event, 'savingsModule')}
                    style={{borderLeft: `5px solid ${colors[1]}`}}>
                    <span>Savings calc</span>
                </a>

                <a href='/#' onClick={event => changeView(event, 'accountsModule')}
                    style={{borderLeft: `5px solid ${colors[2]}`}}>
                    <span>Accounts</span>
                </a>

                {step > 1 && <a href='/#' onClick={event => changeView(event, 'calendarModule')}
                    style={{borderLeft: `5px solid ${colors[3]}`}}>
                    <span>Calendar</span>
                </a>}

                {step > 1 && <a href='/#' onClick={event => changeView(event, 'emergencyFundsModule')}
                    style={{borderLeft: `5px solid ${colors[4]}`}}>
                    <span>Emergency funds</span>
                </a>}
                {step > 0 && <a href='/#' onClick={event => changeView(event, 'yourBudgetModule')}
                    style={{borderLeft: `5px solid ${colors[5]}`}}>
                    <span>Your budget</span>
                </a>}
                {step > 0 && <a href='/#' onClick={event => changeView(event, 'recommendedModule')}
                    style={{borderLeft: `5px solid ${colors[6]}`}}>
                    <span>Recommended</span>
                </a>}
                {step > 0 && <a href='/#' onClick={event => changeView(event, 'snapshots')}
                    style={{borderLeft: `5px solid ${colors[7]}`}}>
                    <span>Snapshots</span>
                </a>}
            </nav>
        </div>
    )
}

export default SubNav