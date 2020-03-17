import React from 'react'
import {  useLocation } from 'react-router-dom'
import { Links } from '../../../navData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faBan } from "@fortawesome/free-solid-svg-icons";
import { StyledNav, darkCoverStyles }from './StyledNav'

const SideNav = ({style, Link, step, getLink, user, isMobile, updateSideBarOpen, logout}) => {
    const loc = useLocation()
    const darkCover = <div
        style={darkCoverStyles} 
        onClick={()=> updateSideBarOpen(false)}
    />
    return(
        <>
        {isMobile && darkCover}
        <div style={style}>
            <StyledNav>
                <div className='user'>
                    <span>
                        <FontAwesomeIcon icon={faUserAlt} />
                    </span>
                    <p>{user}</p>
                </div>
                <span className='links-container'>
                    {Links.map(link => step >= link.step ? 
                    <Link 
                        to={getLink(link.to)}
                        key={link.text} 
                        onClick={()=> updateSideBarOpen(false)}
                        className={`${link.to === loc.pathname ? 'active' : null}`}
                    >
                        {link.icon ? <span>{link.icon}</span> : null}
                        {link.text}
                    </Link> : null)}
                    <button onClick={logout} className='f-link'>
                        <span>
                            <FontAwesomeIcon icon={faBan} />
                        </span>
                        <span>Log out</span>
                    </button>
                </span>
            </StyledNav>
        </div>
        </>
    )
}


export default SideNav