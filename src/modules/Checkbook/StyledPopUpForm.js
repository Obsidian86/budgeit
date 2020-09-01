import styled from 'styled-components'

const StyledPopUpForm = styled.div`
    width: 97.8%;
    background-color: transparent;
    border: none;
    box-shadow: none; 
    padding: 0;
    margin: 5px 0;
    & .row .md{
        position: relative;
        padding: 0;
        margin: 0;
        input[type=text]{
            margin-bottom: 0;
        }
        & .choose-category{
            position: absolute;
            right: 10px;
            bottom: 4px;
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
        .react-datepicker-popper{
            z-index: 30;
        }
    }
    .date-box{
        width: calc(98% - 30px);
        & input {
            width: 100%;
        }
    }
    .btn-group{
        margin-bottom: 10px;
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

  
    & .sub-pop-up{
        width: 95%;
        background-color: #fff;
        margin: 0 auto;
        text-align: center;
        border-radius: 3px;
        border: 4px solid green;
        padding: 0;
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
            margin: 0 0 20px 0;
            display: block;
            padding: 5px 0 10px 0;
        }
        & .cat-list-options{
            display: flex;
            flex-wrap: wrap;
        }
        & div.catOption{
            box-shadow: 0 0 2px #d9d9d9;
            width: 50%;
            margin: 0;
            cursor: pointer;
            font-weight: bold;
            transition: background-color .2s;
            &.dark{
                background-color: lightgray;
            }
            &:hover{
                background-color: gray;
                color: #fff;
            }
            & span{
                display: block;
                padding-top: 19px;
                padding-bottom: 19px;
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