import theme from '../../../styles/theme'
import styled from 'styled-components'

export const StyledNavContainer = styled.div`
    background-color: green;
    position: fixed;
    width: 276px;
    height: 100%;
    min-height: 100vh;
    z-index: 3;
    @media screen and (max-height: 650px){
        overflow-y: scroll;
    }
`

export const StyledNav = styled.nav`
    font-weight: bold;
    font-size: 1.05rem;
    width: 100%;
    & .user{
        display: flex;
        justify-content: flex-start;
        padding-top: 80px;
        color: #fff;
        background-color: ${theme.darkGray};
        p{
            font-size: 1.15rem;
            margin: 10px 0 0 0;
        }
        span{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 23px;
            color: ${theme.darkGray};
            border: 3px solid ${theme.darkGray};
            box-shadow: 0 0 0 2px #fff;
            background-color: #fff;
            height: 36px;
            width: 36px;
            border-radius: 50%;
            margin: 0 17px 17px 12px;
        }
    }
    & .links-container{
        display: block;
        width: 100%;
        border-bottom: 1px solid rgba(255,255,255, .3);
    }
    .f-link{
        border: none;
        background: none;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
    }
    & a, .f-link{
        color: #fff;
        display: block;
        text-decoration: none;
        padding: 16px 20px;
        text-align: left;
        border-top: 1px solid rgba(255,255,255, .3);
        transition: background-color .3s;
        span{
            font-size: 1.2rem;
            margin-right: 5px;
            margin-left: 1px;
            width: 35px;
            display: block;
            float: left;
            transition: margin .3s;
        }
        &:hover{
            background-color: ${theme.green};
            span{
                margin-right: 20px;
            }
        }
        &.active{
            background-color: darkgreen;
        }
    }
    .f-link span{ font-size: 1.1rem;}
`

export const darkCoverStyles = {
    width: '100%', 
    height: "100vh",
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#000',
    opacity: '.5',
    zIndex: "2",
}