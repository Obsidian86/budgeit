import React from 'react'
import SubNav from './TopBar/SubNav'
import styled from 'styled-components'
import { Links } from '../../navData'
import theme from '../../styles/theme'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const SideNav = ({style, Link, step, getLink, user, isMobile, updateSideBarOpen}) => {
    const darkCover = <div
        style={{
            width: '100%', 
            height: "100vh",
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: '#000',
            opacity: '.5',
            zIndex: "2",
        }} 
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
                    {user}
                </div>
                <span className='links-container'>
                    {Links.map(link => step >= link.step ? 
                    <Link to={getLink(link.to)} key={link.text} onClick={()=> updateSideBarOpen(false)}>
                        {link.icon ? <span>{link.icon}</span> : null}
                        {link.text}
                    </Link> : null)}
                </span>
            </StyledNav>
        </div>
        </>
    )
}

const StyledNav = styled.nav`
    font-weight: bold;
    font-size: 1.05rem;
    & .user{
        padding-top: 82px;
        padding-bottom: 18px;
        color: #fff;
        background-color: ${theme.darkGray};
        margin-bottom: 13px;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 23px;
            color: ${theme.darkGray};
            border: 3px solid ${theme.darkGray};
            box-shadow: 0 0 0 2px #fff;
            background-color: #fff;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            margin: 0 auto 15px auto;
            
        }
    }
    & a{
        color: #fff;
        display: block;
        text-decoration: none;
        padding: 18px 20px;
        text-align: left;
        span{
            font-size: 1.2rem;
            margin-right: 21px;
            margin-left: 1px;
        }
        &:hover{
            background-color: ${theme.green};
            span{
                margin-right: 38px;
            }
        }
        &.active{
            background-color: darkgreen;
        }
    }
`

export default SideNav