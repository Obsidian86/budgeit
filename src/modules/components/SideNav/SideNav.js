import React from 'react'
import { useLocation } from 'react-router-dom'
import { Links } from '../../../navData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faBan } from "@fortawesome/free-solid-svg-icons";
import { StyledNavContainer, StyledNav, darkCoverStyles }from './StyledNav'

const SideNav = ({Link, getLink, user, isMobile, updateSideBarOpen, logout}) => {
    const loc = useLocation()
    const darkCover = <div
        style={darkCoverStyles} 
        onClick={()=> updateSideBarOpen(false)}
    />
    return(
        <>
        {isMobile && darkCover}
        <StyledNavContainer>
            <StyledNav>
                <Link 
                    to={getLink('/profile')} 
                    className='profile-link'
                    onClick={()=> updateSideBarOpen(false)}
                >
                    <div className='user'>
                            <span>
                                <FontAwesomeIcon icon={faUserAlt} />
                            </span>
                            <p>{user}</p>
                    </div>
                </Link>
                <span className='links-container'>
                    {Links.map(link =>
                    <Link 
                        to={getLink(link.to)}
                        key={link.text} 
                        onClick={()=> updateSideBarOpen(false)}
                        className={`${link.to === loc.pathname ? 'active' : null}`}
                    >
                        {link.icon ? <span>{link.icon}</span> : null}
                        {link.text}
                    </Link>)}
                    <Link 
                        to={getLink('/')}
                        onClick={()=> {
                            updateSideBarOpen(false)
                            logout()
                        }}
                    >
                        <span> <FontAwesomeIcon icon={faBan} /> </span>
                        Log out
                    </Link>
                </span>
            </StyledNav>
        </StyledNavContainer>
        </>
    )
}


export default SideNav