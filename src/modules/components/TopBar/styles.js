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
            @media (max-width: 750px){ 
               &{display: block;}
            }
            div{
                width: 25%;
                display: block;
                color: #fff;
                background-color: green;
                @media (max-width: 750px){ 
                    &{width: 100%;}
                }
                button{
                    display: flex;
                    text-align: left;
                    padding: 20px;
                    width: 100%;
                    border: none;
                    background: none;
                    cursor: pointer;
                    color: #fff;
                    border-bottom: 1px solid lightgreen;
                    span{
                        padding-left: 14px;
                    }
                    &:hover{ 
                        background-color: #c9c9c9; 
                        color: #000;
                    }
                }
            }
            nav{
                width: 75%;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                a{  
                    text-decoration: none;
                    padding: 20px; 
                    display: inline-block; 
                    color: black;
                    font-size: 1rem;
                    width: 50%;
                    span{
                        border-left: 1px solid black;
                        padding-left: 8px;
                        margin-left: 8px;
                    }
                    &:hover{  background-color: #c9c9c9; }
                }
            }
        }
    `
}