import styled from 'styled-components'

const StyledPopUpForm = styled.div`
    width: 97.8%;
    background-color: transparent;
    border: none;
    box-shadow: none; 
    padding: 0;
    margin: 0;
    margin-top: -18px;
    &.contentBox .before-after{
        width: calc(100% - 54px);
        padding: 0;
        text-align: right;
        margin-top: 20px;
        padding-right: 30px;
        & span{
            display: inline;
            padding: 3px 8px;
            margin: 0;
            border-radius: 5px;
            background-color: #999;
            color: #fff;
            text-shadow: 1px 1px 0px #777;
        }
    }
    &.contentBox .row div.md{
        box-shadow: 0 0 3px gray;
        padding: 0;
        background-color: #444;
        color: #fff;
        margin: 30px auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        & input[type=text], & input[type=number]{
            border: none;
            border-radius: 0;
            position: relative;
            margin: 0;
            border-left: 1px solid #c9c9c9;
            padding: 12px 9px;
            width: 100%;
        }
        & label{
            width: auto;
            margin: 0;
            padding: 0;
            width: 90px;
            padding-left: 13px;
            color: #fff;
        }
        & .choose-category{
            position: absolute;
            right: 2px;
            top: 2px;
            padding: 4px;
            color: #fff;
            background: green;
            border-radius: 3px;
            font-size: .82rem;
            border: none;
            box-shadow: 0 0 3px gray;
            z-index: 7;
            cursor: pointer;
            &:hover{
                background-color: #999;
                color: black;
                transition: color .3s, background-color .3s;
            }
        }
    }
    @media screen and (max-width: 1000px){
        &.contentBox .row div.md{
            width: 88%;
            margin: 10px auto 24px auto;
        }
        &.contentBox .btn-group{
            width: 85%;
        }
    }

    &.contentBox .row .react-datepicker-popper{
        & div{ padding: 0; }
        z-index: 20;
    }
    &.contentBox .row .react-datepicker-wrapper{
        padding: 0;
        width: 100%;
    }
    &.contentBox .row .date-box span{
        padding: 0;
        width: 92%;
        margin-left: -20px;
        & .react-datepicker__input-container{
            padding: 0;
            width: 100%;
        }
        & input[type=text]{
            box-shadow: 0 0 3px gray;
        }
    }

    & .sub-pop-up{
        width: 90%;
        background-color: #fff;
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 10;
        text-align: center;
        border-radius: 3px;
        border: 4px solid green;
        box-shadow: 0 0 15px gray;
        & div .btn.red{
            width: 100px;
            color: #fff;
            margin-top: 10px;
            padding: 4px 8px;
        }
        & .pop-up-title strong{
            background-color: green;
            color: #fff;
            width: 54.1%;
            margin: 0 0 20px -16px;
            display: block;
            padding: 5px 0 10px 0;
        }
        & > div.catOption{
            box-shadow: 0 0 2px #d9d9d9;
            width: 80%;
            margin: 0 auto;
            cursor: pointer;
            border-left: 3px solid gray;
            font-weight: bold;
            transition: background-color .2s;
            &:nth-child(even){
                background-color: lightgray;
                border-left: 3px solid #444;
            }
            &:hover{
                background-color: gray;
                color: #fff;
            }
            & span{
                display: block;
                padding-top: 12px;
            }
        } 
    }
    
    & .form-field-error {
        position: absolute;
        bottom: -20px;
        right: 0;
    }
`

export default StyledPopUpForm