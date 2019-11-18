import React, { useState, useContext } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import { b } from '../providers/tmpBg'
import MainContext from '../providers/MainContext'
// import {daysInMonth} from './components/calendar/dateFunctions'

const CalendarModule = () => {
    const p = useContext(MainContext)
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
    const allItems = [...b, ...inc]

    // let nDate = new Date()

    // if(selectedDay){
    //     for(let i = nDate.getDate() + 1; i < daysInMonth(selectedDay.m, selectedDay.d) + 1; i++){
    //         const dateToCheck
    //     }
    // }

    const contentOne = 
        <div>
            date
            { selectedDay && <>{selectedDay.m}-{selectedDay.d && <>{selectedDay.d}-</>}{selectedDay.y}</> }
        </div>

    return (
        <ContentBox title="Calendar" >
            <div className='row'>
                <div className='sm'>
                    <TabbedView 
                        activeColor={p.theme.vBlue}
                        tabContent={[
                            {tab: "Current month", content: contentOne },
                            {tab: "Year", content: "year"},
                        ]}
                    />
                </div>
                <Calendar 
                    items={allItems} 
                    targetMonth={selectedDay && selectedDay.m ? selectedDay.m : null} 
                    targetYear={selectedDay && selectedDay.y ? selectedDay.y : null} 
                    className='lg'
                    returnItems
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