import styled from 'styled-components'

const StyledAccountModule = styled.span`
    text-align: left;
    margin-top: 56px;
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
    .transaction-card{
        margin-top: 8px;
        font-size: .9rem;
        color: #b9b9b9;
        box-shadow: 0 0 1px gray;
        margin-bottom: 5px;
        display: flex;
        & .actions{
            width: 0;
            overflow: hidden;
            background-color: green;
            transition: width .2s;
        }
        &.withdrawl{
            border-left: 3px solid red;
            & .actions{
                background-color: red;
            }
        }
        &.deposit{
            border-left: 3px solid green;
        }
        &.transfer{
            border-left: 3px solid blue;
            & .actions{
                background-color: blue;
            }
        }
        &.showActions .actions, &:hover .actions{
            width: 190px;
        }
        & .card{
            width: 100%;
            div{
                width: 98%;
                margin: 0 auto;
                padding: 6px 6px 3px 6px;
            }
        }
        & .main{
            font-size: 1.01rem;
            font-weight: bold;
            color: #444;
        }
    }
`

export default StyledAccountModule