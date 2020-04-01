import React from 'react'
import { IP } from '../../utilities/formUtilities'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { Links } from '../../navData'
import styled from 'styled-components'

const CheckbookButton = styled.button`
  border: none;
  margin-top: -3px;
  margin-left: 14px;
  border-radius: 4px;
  color: green;
  background-color: #f2f2f2;
  padding: 7px 6px;
  transition: background-color .1s, color .1s;
  cursor: pointer;
  &:hover{
    color: #fff;
    background-color: green;
  }
  & span{
    display: block;
  }
`

const DashNav = ({Link, step, updateAccData, accData, getLink, isMobile}) =>{
    
    const s = {
      header: {width: '100%', paddingTop: '80px', marginBottom: '40px', boxShadow: '0 0 3px rgba(0,0,0,.8)', backgroundColor: 'rgba(5, 165, 0, 0.8)'},
      dNavCont: {width: '97%', padding: '0', marginBottom: '6px'},
      btn: { marginLeft: '20px', marginTop: '4px', marginBottom: '17px', background: `${accData ? 'red':'none'}`, minWidth: '178px', border: '2px solid #fff'},
      nav: { flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginBottom: "10px"},
      lnk: { margin: '6px 0', display: 'block', fontSize: '.78rem', lineHeight: '1.3rem', padding: '2px 0 2px 0', cursor: 'pointer', color: '#fff' }
    }
    return(
      <div style={s.header}>
        <div className='dashNav row between' style={s.dNavCont}>
          <div>
            {/* <Link to='checkbook'>
              <CheckbookButton>
                <FontAwesomeIcon icon={faMoneyCheck} />
                <span>checkbook</span>
              </CheckbookButton>
            </Link> */}
          </div>
          <div>
            <IP type={`btn_narrow${!accData ? '_green' : '_red'}`}
                icon={<FontAwesomeIcon icon={faFileExport} />}
                style={s.btn}
                onChange={()=>updateAccData(!accData)} label='Export account data'
            />
          </div>
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