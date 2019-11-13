import React from 'react'
import styled from 'styled-components'
import Cal from './Cal'

const Calendar = (props) => {
    const StCal = styled.div`
        font-family: sans-serif;
        #calendar{ 
            margin: 0 auto;
            span {
                width: calc(100% / 7);
                display: block;
                font-weight: bold;
                color: #fff;
                height: 100px;
                margin: 0;
                padding: 0;
                padding-top: 25px;
                overflow: hidden;
                position: relative;
                background-color: rgb(212, 212, 212);
            }
            .allDays{
                display: flex;
                flex-wrap: wrap;
            }
            .weekDay {
                height: 30px;
                padding: 0;
                text-align: center;
                background-color: rgb(60, 118, 241);
                padding-bottom: 12px;
            }
            .days {
                background-color: white;
                box-shadow: 0 0 2px #999;
                &.today {
                    background-color: rgb(212, 255, 221);
                    box-shadow: inset 0 0 210px rgb(141, 248, 141);
                }
                .dayNum {
                    font-size: 0.9rem;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    padding: 0;
                    margin: 0;
                    color: #333;
                }
                &:hover{
                    background-color: #e8e8e8;
                    box-shadow: none;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                .eventItem {
                    width: 20%;
                    margin: 3px auto;
                    width: 92%;
                    display: block;
                    padding: 3px 4px;
                    color: #999;
                    font-weight: normal;
                    border-left: 3px solid hotpink;
                    cursor: pointer;
                    &:hover{
                        background-color: darkgray;
                        color: #fff;
                    }
                } 
            }
            .cal-controls{
                display: flex;
                padding: 10px;
                justify-content: space-between; 
                button{
                    border: 2px solid green;
                    background: none;
                    padding: 5px 10px;
                    margin-left: 7px;
                    border-radius: 8px;
                    color: green;
                    cursor: pointer;
                    &:hover{
                        border: 2px solid gray;
                        background: gray;
                        color: #fff;
                    }
                }
                .dayMonth{
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #b1b1b1;
                    padding-top: 5px;
                } 
            } 
        }
    `
    return <StCal><Cal {...props} /></StCal>
}

export default Calendar