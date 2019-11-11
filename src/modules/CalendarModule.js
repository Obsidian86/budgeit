import React, { useContext } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar/src/Cal'
import { b } from '../providers/tmpBg'

const CalendarModule = () => {
    return (
        <ContentBox title="Calendar" >
            <Calendar items={b} />
        </ContentBox>
    )
}

export default CalendarModule