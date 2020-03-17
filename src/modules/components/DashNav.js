import React from 'react'
import { IP } from '../../utilities/formUtilities'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Links } from '../../navData'

const DashNav = ({Link, step, updateAccData, accData, getLink, isMobile}) =>{
    
    const s = {
      header: {width: '100%', paddingTop: '80px', marginBottom: '40px', boxShadow: '0 0 3px rgba(0,0,0,.8)', backgroundColor: 'rgba(5, 165, 0, 0.8)'},
      dNavCont: {width: '97%', padding: '0', marginBottom: '6px'},
      btn: {marginRight: '0', marginTop: '4px', marginBottom: '17px', alignSelf: 'flex-start', background: `${accData ? 'red':'none'}`, minWidth: '178px', border: '2px solid #fff'},
      nav: { flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginBottom: "10px"},
      lnk: { margin: '6px 0', display: 'block', fontSize: '.78rem', lineHeight: '1.3rem', padding: '2px 0 2px 0', cursor: 'pointer', color: '#fff' }
    }
    return(
      <div style={s.header}>
        <div className='dashNav right' style={s.dNavCont}>
          <IP type={`btn_narrow${!accData ? '_green' : '_red'}`}
              icon={<FontAwesomeIcon icon={faFileExport} />}
              style={s.btn}
              onChange={()=>updateAccData(!accData)} label='Export account data'
          />
        </div>
        {isMobile && <nav style={s.nav} className='dashNavLinks'>
          {Links.map((link, index) => step >= link.step ? 
            <Link to={getLink(link.to)} 
              style={{ 
                borderLeft: index !== 0 ? '1px solid #fff' : null,
                width: (index === 0 || index === 1 || index === 3 || index === 5) ? '10%' : 
                  (index === 2 || index === 6) ? '17%' : '12%',
                ...s.lnk
              }} 
              key={link.text}
            > {link.text} </Link> : null)}
        </nav>}
      </div>
    )}

export default DashNav