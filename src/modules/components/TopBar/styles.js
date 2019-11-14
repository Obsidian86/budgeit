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
        height: ${isOpen ? '320px' : '60px'};
        button{
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
        & div {
            padding-top: 10px;
            padding-bottom: 10px;
            width: 96%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        nav{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            a{ 
                box-shadow: 0 0 3px green;
                display: block; 
            }
        }
    `
}