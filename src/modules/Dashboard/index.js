import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '../interface/ProgressBar'
import ContentBox from '../interface/ContentBox'
import MainContext from '../../providers/MainContext'
import * as processData from './processData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faMoneyBillWave, faStream, faChartLine } from "@fortawesome/free-solid-svg-icons";
import calcEmergency from '../EmergencyFunds/functions'

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

    const { content: accountContent } = processData.proccessAccountData(p.accounts)
    const { content: sourceContent, total: totalSource } = processData.proccessSourceData(p.incomeSources)
    const { content: budgetContent, total: percent } = processData.proccessbudgetData(p.budget, totalSource, p.viewBy)
    const { content: valueOverTime } = processData.proccessSnapshots(p.snapshots, boxWidth)


    const barNodeProps = { exClass: 'lg', exStyles: {'padding': '10px', maxWidth: '300px' }}
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
        <div className='w-99 row'>
            <ContentBox {...barNodeProps}>
                <ProgressBar percent={ percent } title={ percent + '% income budgeted'} color='green' bg='lightgreen' height={38} fontSize={'1rem'} />
            </ContentBox>
            <ContentBox {...{...barNodeProps, exStyles: {...barNodeProps.exStyles }}} >
                <ProgressBar {...emerProps} title={'3-6 month emergency'} height={38} fontSize={'1rem'} />
            </ContentBox>
        </div>}
        <ContentBox title='Accounts' exClass={'lg break-1155'} icon={<FontAwesomeIcon icon={faUniversity} />} >
            { accountContent }
        </ContentBox>
        <ContentBox title='Income' exClass={'smPlus break-1155'} icon={<FontAwesomeIcon icon={faMoneyBillWave} />} exStyles={{minWidth: '230px'}}>
            { sourceContent }
        </ContentBox>
        <ContentBox title='Value' icon={<FontAwesomeIcon icon={faChartLine} />} itemId={'value-content'}>
            { valueOverTime }
        </ContentBox>
        <ContentBox title='Budget' icon={<FontAwesomeIcon icon={faStream} />}>
            { budgetContent }
        </ContentBox>
    </div>
    )
}

export default Dashboard
