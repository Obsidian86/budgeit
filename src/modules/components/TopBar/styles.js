import styled from 'styled-components';

export const styles = (p, isOpen) => {
    return styled.div`
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        background-color: white;
        padding: 0;
        color: ${p.theme.green};
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        height: ${isOpen ? 'auto' : '60px'};
        border-bottom: ${!isOpen ? 'none' : '4px solid green'};
        .hamburger{
            position: absolute;
            left: 5px;
            top: 12px;
            border: none;
            background: none;
            font-size: 30px;
            color: ${p.theme.darkgray};
            cursor: pointer;
        }
        p, ul {
            margin: 0;
            padding-top: 7px;
            font-weight: bold;
        }
        .logo {
            background-color: ${p.theme.green};
            padding: 7px 10px 7px 10px;
            border-radius: 4px;
            color: white;
            margin-left: 38px;
            display: flex;
            img{
                border: 1.9px solid #fff;
                background-color: #fff;
                border-radius: 2px;
                margin: 0;
                height: 16px;
                width: 16px;
                margin-top: 3px;
                
            }
            p{
                margin: 0;
                padding: 0;
                padding-top: 1px;
                margin-left: 8px;
            }
        }
        & .mainContainer {
            padding-top: 10px;
            padding-bottom: 10px;
            width: 96%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        div{
            display: flex;
            @media (max-width: 750px){ &{display: block;} }
            div{
                width: 25%;
                display: block;
                color: #fff;
                background-color: green;
                @media (max-width: 750px){ &{width: 100%;} }
                button{
                    display: flex;
                    text-align: left;
                    padding: 16px 20px;
                    width: 100%;
                    border: none;
                    background: none;
                    cursor: pointer;
                    color: #fff;
                    border-bottom: 1px solid lightgreen;
                    span{ padding-left: 14px; }
                    &:hover{ 
                        background-color: #c9c9c9; 
                        color: #000;
                    }
                }
            }
            nav{
                width: 75%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-content: flex-start;
                @media (max-width: 750px){ &{width: 100%;} }
                a{  
                    height: 21px;
                    text-decoration: none;
                    padding-bottom: 17px;
                    padding-top: 23px;
                    color: black;
                    font-size: 1rem;
                    width: calc(33.33% - 25px);
                    text-align: left;
                    padding-left: 20px;
                    @media (max-width: 750px){ 
                        &{
                            width: calc(50% - 25px)
                        }
                    }
                    span{
                        width: 100%;
                        text-align: center;
                        display: block;
                    }
                    &:hover{  background-color: #c9c9c9; }
                }
            }
        }
    `
}