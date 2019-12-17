import React from 'react'
import { IP } from '../../utilities/formUtilities'

const DashNav = ({Link, step, updateAccData, accData, getLink}) =>{
    const Links = [
      { to: '/#default', text: 'Home/sources', step: 0 },
      { to: '/savings#savingsModule', text: 'Saving calc', step: 0 },
      { to: '/accounts#accountsModule', text: 'Accounts', step: 0 },
      { to: '/calendar#calendarModule', text: 'Calendar', step: 2 },
      { to: '/accounts#emergencyFundsModule', text: 'Emergency', step: 2 },
      { to: '/budget#recommendedModule', text: 'Recommended', step: 1 },
      { to: '/budget#yourBudgetModule', text: 'Budget', step: 1 },
      { to: '/calendar#snapshots', text: 'Snapshots', step: 2 }
    ]
    const s = {
      dNavCont: {width: '97%', padding: '0', marginBottom: '6px'},
      btn: {marginRight: '0', marginTop: '4px', marginBottom: '13px', alignSelf: 'flex-start', minWidth: '178px'},
      nav: { flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginBottom: "24px"},
      lnk: { margin: '0', display: 'block', fontSize: '.8rem', width: `${100/8}%`, lineHeight: '1.3rem', padding: '10px 0 10px 0' }
    }
    return(
      <>
        <div className='dashNav right' style={s.dNavCont}>
          <IP type={`btn_narrow${!accData ? '_green' : '_red'}`}
              style={s.btn}
              onChange={()=>updateAccData(!accData)} label='Export / import accounts'
          />
        </div>
        <nav style={s.nav} className='dashNavLinks'>
          {Links.map((link) => step >= link.step ? <Link to={getLink(link.to)} style={s.lnk} key={link.text}> {link.text} </Link> : null)}
        </nav>
      </>
    )}

export default DashNav