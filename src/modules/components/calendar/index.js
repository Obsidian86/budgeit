import React, { useState } from 'react'
import styled from 'styled-components'
import Cal from './Cal'

const Calendar = (props) => {
    const [calendarRange, updateCalendarRange] = useState({ start: null, end: null })

    const borderColor = props.borderColor || 'green'
    const btnColor = props.btnColor || '#fff'

    const StCal = styled.div`
        font-family: sans-serif;
        #calendar{ 
            margin: 0 auto;
            span {
                width: calc(100% / 7 - 1px);
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
                background-color: #00bbd4;
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
                    border-left: 3px solid red;
                    cursor: pointer;
                    &:hover{
                        background-color: darkgray;
                        color: #fff;
                    }
                } 
                .pastEvent {
                    color: lightgray;
                    font-style: italic;
                    text-decoration: line-through;
                }
            }
            .cal-controls{
                display: flex;
                padding: 10px;
                justify-content: space-between; 
                button{
                    border: 2px solid ${borderColor};
                    background: ${btnColor};
                    padding: 5px 10px;
                    margin-left: 7px;
                    margin-top: 10px;
                    border-radius: 8px;
                    color: ${borderColor};
                    cursor: pointer;
                    &:hover{
                        border: 2px solid gray;
                        background: gray;
                        color: #fff;
                    }
                }
                .thisDateBtn{
                    background-color: ${borderColor};
                    color: ${btnColor}
                }
                .dayMonth{
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #b1b1b1;
                    padding-top: 17px;
                } 
            } 
        }
    `
    const { rangeDate, targetYear, } = props
    const allDates = [rangeDate.start, rangeDate.end, targetYear, calendarRange.start, calendarRange.end]
    let filteredDates = []
    for(const date in allDates){
        const d = allDates[date]
        let year = null
        if(d && d.toString() && d.toString().length === 4 ) year = parseInt(d) 
        if(d && d.toString() && d.toString().split("-").length === 3) year = parseInt(d.split("-")[2])
        year && filteredDates.push(year)
    }

    filteredDates.sort()
    let updateRange = filteredDates[0] !== calendarRange.start || filteredDates[filteredDates.length - 1] !== calendarRange.end
    updateRange && updateCalendarRange({
        start: filteredDates[0],
        end: filteredDates[filteredDates.length - 1]
    })

    return <StCal className={props.className && props.className} >
            <Cal {...props} loadRange = {calendarRange}/>
        </StCal>
}

export default Calendar
