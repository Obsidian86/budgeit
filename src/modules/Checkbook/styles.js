import styled from 'styled-components'

const StyledAccountModule = styled.span`
    text-align: left;
    margin-top: 16px;
    & .message-container{
        margin: 0 auto;
        padding: 0;
        width: 96%;
        height: 0;
        opacity: 0;
        transition: height .3s, opacity .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        &.message-open{
            height: 99px;
            opacity: 1;
        }
    }
    .search-box{
        margin-top: 5px;
        align-items: center;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        background-color: #444;
        padding: 8px 0;
        border-radius: 3px;
        position: relative;
        & span{
            color: #fff;
            display: block;
            width: 100px;
            text-align: right;
            margin-right: 10px;
            font-weight: bold;
            &.clear-button{
                position: absolute;
                right: 3px;
                z-index: 4;
                color: red;
                width: 50px;
                text-align: center;
                color: #fff;
                background-color: red;
                padding: 8px 4px;
                border-radius: 3px;
                cursor: pointer;
                &:hover{
                    background-color: gray;
                }
            }
        }
        & input[type=text]{
            margin: 0;
            margin-right: 8px;
            border: none;
            border-left: 3px solid green;
            box-shadow: 0 0 2px gray;
            width: 60%;
            transition: width .3s;
            &:focus{
                margin: 0 8px 0 0;
                width: 80%;
            }
        }
    }
    & strong{
        font-size: 1.2rem;
        display: block;
        text-align: right;
    }
    .accList{ margin-top: 12px; }
    ul{
        list-style-type: none;
        padding: 0;
        li{
            transition: background-color .3s;
            &:hover{
                background-color: #d9d9d9;
            }
            cursor: pointer;
            background-color: #fff;
            border-bottom: 1px solid #d9d9d9;
            box-shadow: 0 0 3px lightgray;
            padding: 5px;
            color: gray;
            & div{
                width: 37%;
                display: block;
                text-align: right;
                font-weight: bold;
                padding: 6px 10px;
                &:nth-child(odd){
                    text-align: left;
                    font-weight: bold;
                }
                &:nth-child(2) span{
                    box-shadow: 0 0 3px rgba(0, 0, 0, .4);
                    padding: 3px 5px;
                    border-radius: 5px;
                    color: #666;
                    background-color: #fff;
                }
                &:nth-child(3), &:nth-child(4){
                    font-style: italic;
                    font-weight: normal
                }
            }
            &.selected{
                background-color: green;
                color: #fff;
                border-radius: 3px;
            }
        } 
    }
    .transaction-card{
        margin-top: 8px;
        font-size: .9rem;
        color: #b1b1b1;
        box-shadow: 0 0 1px gray;
        margin-bottom: 5px;
        display: flex;
        transition: all .3s;
        &.hide-transaction{
            height: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
        }
        & .actions{
            width: 0;
            overflow: hidden;
            background-color: green;
            transition: width .2s;
            color: green;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 1.6rem;
            i{
                cursor: pointer;
                background-color: #fff;
                height: 50px;
                width: 50px;
                display: flex;
                justify-content: center; 
                align-items: center;
                border-radius: 50%;
                text-align: center;
                &:first-child{
                    color: red;
                }
                &:hover{
                    color: #333;
                    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
                }
            }
        }
        &.withdraw, &.charge{
            border-left: 5px solid red;
            & .actions{
                background-color: red;
            }
        }
        &.deposit, &.payment{
            border-left: 5px solid green;
        }
        &.transfer{
            border-left: 5px solid #444;;
            & .actions{
                background-color: #444;;
            }
        }
        &.showActions{
            box-shadow: 0 0 12px lightgray;
        }
        &.showActions .actions{
            width: 150px;
            
        }
        &:hover .actions{
            width: 150px;
            box-shadow: inset -2px 0px 3px rgba(0, 0, 0, .4);
        }
        & .card{
            width: 100%;
            div{
                width: 97%;
                margin: 0 auto;
                padding: 9px 6px 9px 6px;
                font-style: italic;
            }
        }
        & div.main{
            padding: 0px 6px 0px 6px;
            font-size: 1.01rem;
            font-weight: bold;
            color: #444;
            font-style: normal;
        }
    }
    .choose-account-list-toggle{
        margin: 0;
        margin-top: -3px;
        text-align: center;
        & p{
            display: inline;
            padding: 5px 10px;
            margin: 0;
            font-weight: bold;
            position: relative;
            &:hover{
                background-color: #d8d8d8;
                cursor: pointer;
            }
        }
    }
`

export default StyledAccountModule