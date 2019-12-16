import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUserMinus, faBan, faDownload, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from '../../../styles/colors'

const SubNav = ({ p, step, Link, toggleNav }) => {
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
    profName: { marginLeft: '-5px', width: '87%', paddingRight: '20px' },
    profImage: {
      background: 'white',
      borderRadius: '50%',
      padding: '4px 5px',
      color: '#555'
    },
    profList: { backgroundColor: '#fff', fontSize: '1rem', textAlign: 'left', width: '100%' },
    profListItem: { color: 'green', paddingLeft: '55px', width: '100%' },
    Li: (color) => ({ borderLeft: `5px solid ${color}` })
  }

  const Links = [
    { to: '/#default', text: 'Home/sources', step: 0 },
    { to: '/savings#savingsModule', text: 'Savings calc', step: 0 },
    { to: '/accounts#accountsModule', text: 'Accounts', step: 0 },
    { to: '/calendar#calendarModule', text: 'Calendar', step: 2 },
    { to: '/accounts#emergencyFundsModule', text: 'Emergency funds', step: 2 },
    { to: '/budget#recommendedModule', text: 'Recommended', step: 1 },
    { to: '/budget#yourBudgetModule', text: 'Budget', step: 1 },
    { to: '/calendar#snapshots', text: 'Snapshots', step: 2 }
  ] 

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
                newProfile && newProfile.replace(' ', '') !== '' && newProfile !== p.profile && p.saveState({ profile: newProfile })
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
        {Links.map((link, index) => 
          step >= link.step ? <Link to={p.getLink(link.to)} style={s.Li(colors[index])} key={link.text} onClick={toggleNav}>
            <span>{link.text}</span>
          </Link> : null)
        }
      </nav>
    </div>
  )
}

export default SubNav