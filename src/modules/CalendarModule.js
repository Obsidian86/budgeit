import React from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import { b } from '../providers/tmpBg'

const CalendarModule = () => {
    let inc = [
        {
            item: "Pay",
            category: "Income",
            amount: "2000",
            date: "11-1-2019", end: "11-1-2025", rec: 'biWeekly',
            color: 'green'
        }
    ]
    return (
        <ContentBox title="Calendar" >
            <Calendar items={[...b, ...inc]} />
        </ContentBox>
    )
}

export default CalendarModule