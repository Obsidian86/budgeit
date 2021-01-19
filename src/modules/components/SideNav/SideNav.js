import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Links } from '../../../navData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faBan } from "@fortawesome/free-solid-svg-icons";
import { StyledNavContainer, StyledNav, darkCoverStyles } from './StyledNav'

const SideNav = ({ Link, getLink, user, isMobile, updateSideBarOpen, logout, setDialog }) => {
    const loc = useLocation()
    const history = useHistory()
    const darkCover = <div
        style={darkCoverStyles}
        onClick={() => updateSideBarOpen(false)}
    />
    const handleClearDataClick = e => {
        e.preventDefault()
        setDialog({
            open: true,
            header: 'Clear data', 
            message: <>Are you sure you want to clear data? <br /> This can not be undone.</>, 
            confirm: ()=>{
                logout()
                history.push('/dashboard')
            },
            reject: ()=>{ return null }
        }) 
    }
    return (
        <>
            {isMobile && darkCover}
            <StyledNavContainer>
                <StyledNav>
                    {user ? <Link
                        to={getLink('/profile')}
                        className='profile-link'
                        onClick={() => updateSideBarOpen(false)}
                    >
                        <div className='user'>
                            <span>
                                <FontAwesomeIcon icon={faUserAlt} />
                            </span>
                            <p>{user}</p>
                        </div>
                    </Link> : <Link
                        to={getLink('/login')}
                        className='profile-link'
                        onClick={() => updateSideBarOpen(false)}
                    >
                            <div className='user'>
                                <span>
                                    <FontAwesomeIcon icon={faUserAlt} />
                                </span>
                                <p>Login</p>
                            </div>
                        </Link>}
                    <span className='links-container'>
                        {Links.map(link =>
                            <Link
                                to={getLink(link.to)}
                                key={link.text}
                                onClick={() => updateSideBarOpen(false)}
                                className={`${link.to === loc.pathname ? 'active' : null}`}
                            >
                                {link.icon ? <span>{link.icon}</span> : null}
                                {link.text}
                            </Link>)}
                        {user ? 
                            <Link
                                to={getLink('/')}
                                onClick={() => {
                                    updateSideBarOpen(false)
                                    logout()
                                }}
                            >
                            <span>
                                <FontAwesomeIcon icon={faBan} />
                            </span>
                                Log out
                            </Link> : 
                            <a href='/' onClick={handleClearDataClick}>
                                <span>
                                    <FontAwesomeIcon icon={faBan} />
                                </span>
                                Clear data
                            </a>}
                    </span>
                </StyledNav>
            </StyledNavContainer>
        </>
    )
}


export default SideNav