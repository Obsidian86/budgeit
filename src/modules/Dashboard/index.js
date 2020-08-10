import React, { useContext } from 'react'
import ProgressBar from '../interface/ProgressBar'
import ContentBox from '../interface/ContentBox'
import MainContext from '../../providers/MainContext'
import * as processData from './processData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faMoneyBillWave, faStream } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const p = useContext(MainContext)
    console.log(p)

    const { content: accountContent } = processData.proccessAccountData(p.accounts)
    const { content: sourceContent, total: totalSource } = processData.proccessSourceData(p.incomeSources)
    const { content: budgetContent, total: percent } = processData.proccessbudgetData(p.budget, totalSource, p.viewBy)
    const x = processData.proccessbudgetData(p.budget, totalSource)

    return <div className='row w-99'>
        {percent && <div className='w-99'>
            <ContentBox exClass={'smPlus'} exStyles={{'padding': '10px'}}>
                <ProgressBar percent={ percent } title={ percent + '% of income budgeted'} color='green' bg='lightgreen' height={38} />
            </ContentBox>
        </div>}
        <ContentBox title='Accounts' exClass={'lg'} icon={<FontAwesomeIcon icon={faUniversity} />} >
            { accountContent }
        </ContentBox>
        <ContentBox title='Income Sources' exClass={'smPlus'} icon={<FontAwesomeIcon icon={faMoneyBillWave} />} >
            { sourceContent }
        </ContentBox>
        <ContentBox title='Budget Items' icon={<FontAwesomeIcon icon={faStream} />}>
            { budgetContent }
        </ContentBox>
    </div>
}

export default Dashboard