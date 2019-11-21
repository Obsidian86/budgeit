import React, { useState, useContext, Fragment as FR } from 'react'
import ContentBox from './interface/ContentBox'
import Calendar from './components/calendar'
import TabbedView from './interface/TabbedView'
import { b } from '../providers/tmpBg'
import MainContext from '../providers/MainContext'
import { Months } from './components/calendar/dateFunctions'
import { money } from '../utilities/convert'
import SoftList from './interface/SoftList'

const CalendarModule = () => {
    const p = useContext(MainContext)
    const [selectedDay, updateSelectedDay] = useState(null) 
    const [currentItems, updateCurrentItems] = useState(null)

    const allItems = [...b, p.incomeSources] 

    let yearTrack = ''
    let monthTrack = ''

    const hStyle = {
        marginBottom: '-16px',
        marginTop: '19px'
    }

    const contentOne =
        <>
            <h2 style={hStyle}> Overview </h2>
            <SoftList split>
                { currentItems && currentItems.map((ci, i) =>
                    {
                        const iDate = ci.itemDate.split('-')
                        let showDate = false
                        if(iDate[2] !== yearTrack || iDate[0] !== monthTrack){
                            showDate = true
                            yearTrack = iDate[2]
                            monthTrack = iDate[0]
                        }
                        return <FR key={i}>
                            {showDate && <li style={{fontSize: '1.2rem'}}>{Months[iDate[0] - 1]} {iDate[2]}</li>}
                            <li>
                                <span>{ci.item}</span>
                                <span>{money(ci.amount)}</span>
                                <span>{ci.itemDate}</span>
                            </li>
                        </FR>
                    }
                ) }
            </SoftList>
        </>
    const contentTwo =
        <>
            <h2 style={hStyle}> Yearly Summary </h2>
            <SoftList split>
            </SoftList>
        </>

    const procUpdateDate = (data) => {
        updateSelectedDay(data.new)
        updateCurrentItems(data.items)
    }

    return (
        <ContentBox title="Calendar" >
            <div className='row'>
                <div className='sm'>
                    <TabbedView
                        activeColor={p.theme.vBlue}
                        tabContent={[
                            {tab: "Current month", content: contentOne },
                            {tab: "Year", content: contentTwo },
                        ]}
                    />
                </div>
                <Calendar 
                    items={allItems} 
                    targetMonth={selectedDay && selectedDay.m ? selectedDay.m : null} 
                    targetYear={selectedDay && selectedDay.y ? selectedDay.y : null} 
                    className='lg'
                    returnItems
                    onLoad = {p => console.log(p)}
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