import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from '../../../styles/colors'

const SubNav = ({ p, step, Link, toggleNav }) => {
  // const profileList = null
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
    { to: '/#default', text: 'Income', step: 0 },
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
          <div style={s.profile}>
            <span style={s.profImage}>
              <FontAwesomeIcon icon={faUserAlt} />
            </span>
            &nbsp; {p.profile}
          </div>
        }
        <button onClick={p.logout}>
          <FontAwesomeIcon icon={faBan} />
          <span>Log out</span>
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