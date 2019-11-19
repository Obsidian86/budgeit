import React, { useState, useContext } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import { b } from '../providers/tmpBg'
import MainContext from '../providers/MainContext'
import { Months } from './components/calendar/dateFunctions'
import { Money } from '../utilities/convert'

const CalendarModule = () => {
    const p = useContext(MainContext)
    const [selectedDay, updateSelectedDay] = useState(null) 
    const allItems = [...b, p.incomeSources] 
 
    const thisDate = new Date()
    const contentOne = 
        <div>
            { Months[selectedDay ? selectedDay.m - 1 : thisDate.getMonth()] } Overview
        </div>

    const procUpdateDate = (data) => {
        updateSelectedDay(data.new)
    }

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
                    clickDay={p => procUpdateDate(p)} 
                    clickNext={p => procUpdateDate(p)} 
                    clickPrev={p => procUpdateDate(p)} 
                    clickThisDate={p => procUpdateDate(p)} 
                />
            </div>
        </ContentBox>
    )
}

export default CalendarModule