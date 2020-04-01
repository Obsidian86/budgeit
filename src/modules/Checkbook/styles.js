import styled from 'styled-components'

const StyledAccountModule = styled.span`
    text-align: left;
    & strong{
        font-size: 1.2rem;
        color: #b2b2b2;
    }
    ul{
        list-style-type: none;
        padding: 0;
        border-top: 1px solid #d9d9d9;
        li{
            cursor: pointer;
            background-color: #fff;
            border-bottom: 1px solid #d9d9d9;
            padding: 5px 0;
            & span{
                width: 60%;
                display: block;
                padding: 4px 12px;
                &:first-child{
                    font-size: 1.1rem;
                    font-weight: bold;
                }
            }
            &.selected{
                background-color: green;
                color: #fff;
            }
        } 
    }
`

export default StyledAccountModule