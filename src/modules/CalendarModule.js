import React, { useState } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import { b } from '../providers/tmpBg'

const CalendarModule = () => {
    const [selectedDay, updateSelectedDay] = useState(null)
    let inc = [
        {
            item: "Pay",
            category: "Income",
            amount: "2000",
            date: "11-1-2019", end: "11-1-2025", rec: 'biWeekly',
            color: 'green'
        }
    ]

    const contentOne = <div>
        { selectedDay && <>{selectedDay.m }-{selectedDay.d && <>{selectedDay.d}-</>}{selectedDay.y}</> }
    </div>

    return (
        <ContentBox title="Calendar" >
            <div className='row'>
                <div className='sm'>
                    <TabbedView 
                        activeColor="#f1f1f1"
                        tabContent={[
                            {tab: "Current month", content: contentOne },
                            {tab: "Year", content: "year"},
                        ]}
                    />
                </div>
                <Calendar 
                    items={[...b, ...inc]} 
                    className='lg' 
                    clickDay={p => updateSelectedDay(p)} 
                    clickNext={p => updateSelectedDay(p.new)} 
                    clickPrev={p => updateSelectedDay(p.new)} 
                    clickThisDate={p => updateSelectedDay(p.new)} 
                />
            </div>
        </ContentBox>
    )
}

export default CalendarModule