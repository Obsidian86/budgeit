import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '../interface/ProgressBar'
import ContentBox from '../interface/ContentBox'
import MainContext from '../../providers/MainContext'
import * as processData from './processData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faMoneyBillWave, faStream, faChartLine, faCalendar } from "@fortawesome/free-solid-svg-icons";
import calcEmergency from '../EmergencyFunds/functions'
import { Link } from 'react-router-dom'
import { parsedCurrentDate } from '../components/calendar/dateFunctions'
import StyledTri from './StyledTri'

const Dashboard = () => {
    const p = useContext(MainContext)
    const [boxWidth, updateBoxWidth] = useState(500)

    const getBoxWidth = () => {
        const ss = document.getElementById('value-content')
        ss && updateBoxWidth(ss.offsetWidth - 30)
    }
    useEffect(() => {
        getBoxWidth()
        window.addEventListener('resize', getBoxWidth)
        return function(){window.removeEventListener('resize', getBoxWidth)}
    })

    let itemsToday = []
    let allItems = [...p.incomeSources || [], ...p.accountTransfers || []]
    for(const item in p.budget){
        allItems.push(...p.budget[item].items)
    }

    const todaysDate = parsedCurrentDate()
    allItems.forEach(el => {
        if((el.nextAuto && el.nextAuto === todaysDate) || (el.date && el.date === todaysDate)){
            itemsToday.push(el)
        }
    });
    const { content: accountContent } = processData.proccessAccountData(p.accounts)
    const { content: sourceContent, total: totalSource } = processData.proccessSourceData(p.incomeSources)
    const { content: budgetContent, total: percent } = processData.proccessbudgetData(p.budget, totalSource, p.viewBy)
    const { content: valueOverTime } = processData.proccessSnapshots(p.snapshots, boxWidth)

    const { livingExpenses, totalAvailable } = calcEmergency(p.total, p.budget, p.accounts)
    const emerPercent = ((totalAvailable / (livingExpenses * 6)) * 100).toFixed(2)
    const useEmerPercent = (emerPercent >= 100) ? 100 : emerPercent
    const emerProps = { 
        percent: useEmerPercent, 
        color: useEmerPercent < 50 ? 'red' : 'green', 
        bg: useEmerPercent < 50 ? 'pink' : 'lightgreen',
        marks: [50]
    }

    return (
    <div className='row w-99'>
        { totalSource > 0 && 
        <StyledTri>
            <ContentBox>
                <Link to='/calendar' className='items-today'>
                    <i><FontAwesomeIcon icon={faCalendar} /></i>
                    <span>{itemsToday.length} happening today</span>
                </Link>
            </ContentBox>
            <ContentBox>
                <ProgressBar percent={ percent } title={ percent + '% income budgeted'} color='green' bg='lightgreen' height={38} fontSize={'1rem'} />
            </ContentBox>
            <ContentBox>
                <ProgressBar {...emerProps} title={'3-6 month emergency'} height={38} fontSize={'1rem'} />
            </ContentBox>
        </StyledTri>}
        <ContentBox exClass={'lg break-1155'} icon={<FontAwesomeIcon icon={faUniversity} />} >
            <h4 className='section-title'>Accounts</h4>
            { accountContent }
        </ContentBox>
        <ContentBox exClass={'smPlus break-1155'} icon={<FontAwesomeIcon icon={faMoneyBillWave} />} exStyles={{minWidth: '230px'}}>
            <h4 className='section-title'>Income</h4>
            { sourceContent }
        </ContentBox>
        <ContentBox exClass={'max'} icon={<FontAwesomeIcon icon={faChartLine} />} itemId={'value-content'}>
            <h4 className='section-title'>Value</h4>
            { valueOverTime }
        </ContentBox>
        <ContentBox exClass={'max'} icon={<FontAwesomeIcon icon={faStream} />}>
            <h4 className='section-title'>Budget</h4>
            { budgetContent }
        </ContentBox>
    </div>
    )
}

export default Dashboard
