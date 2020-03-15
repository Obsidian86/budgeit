import React from 'react'
import SubNav from './TopBar/SubNav'
import styled from 'styled-components'

const Links = [
    { to: '/#default', text: 'Income', step: 0 },
    { to: '/savings#savingsModule', text: 'Saving calc', step: 0 },
    { to: '/accounts#accountsModule', text: 'Accounts', step: 0 },
    { to: '/calendar#calendarModule', text: 'Calendar', step: 2 },
    { to: '/accounts#emergencyFundsModule', text: 'Emergency', step: 2 },
    { to: '/budget#recommendedModule', text: 'Recommended', step: 1 },
    { to: '/budget#yourBudgetModule', text: 'Budget', step: 1 },
    { to: '/calendar#snapshots', text: 'Snapshots', step: 2 }
  ]


const SideNav = ({style, Link}) => {
    return(
        <div style={style}>
            <div>user name</div>
            <StyledNav>
            {
                Links.map(linkItem => <Link key={linkItem.text}>{linkItem.text}</Link>)
            }
            </StyledNav>
        </div>
    )
}

export default SideNav

const StyledNav = styled.nav`
    margin-top: 30px;
    & a{
        color: #fff;
        display: block;
        text-decoration: none;
        padding: 20px;
        box-shadow: 0 0 3px white;
        &:hover{
            background-color: limegreen;
        }
    }
`