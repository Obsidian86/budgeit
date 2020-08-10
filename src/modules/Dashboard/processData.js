import React from 'react'
import { calcMoney, money, convert, disRec, up, percent } from '../../utilities/convert'
import SoftList from '../interface/SoftList'
import Bullet from '../interface/Bullet'
import ProgressBar from '../interface/ProgressBar'
import ChartContainer from '../components/ChartContainer'
import { colors } from '../../styles/colors'
import { Link } from 'react-router-dom'

const noData = (item, link) => {
    const content = <div className='content-pad'>
        <div className='row between'>
            <h3 style={{
                'width': '100%',
                'fontSize': '1.3rem',
                'textAlign': 'center',
                'color': '#666'
            }}>No {item} Created</h3>
        </div>
        <div className='right'>
            <Link to={'/' + link} className='btn'>Add / edit {item}</Link>
        </div>
    </div>
    return ({content, total: 0})
}

export const proccessAccountData = accounts => {
    if(accounts.length < 1) return noData('accounts', 'accounts') 
    let total = accounts.reduce((prev, cur) => {
        return calcMoney(prev, cur.amount)
    }, 0)
    let chartData = []
    const data = accounts.map((acc, index) => {
        const color = (index + 1 < colors.length) ? colors[index] : '#' + index + '' + index + '' + index
        chartData.push({
            color, 
            title: acc.name,
            value: acc.amount / total
        })
        return <li key={acc.id}>
            <span><Bullet color={color} />{ acc.name } </span>
            <span>{ money(acc.amount) } </span>
        </li>
    })
    const accountContent = <div className='content-pad'>
        <div className='row between'>
            <ChartContainer styles={{'width': '190px'}} data={chartData} />
            <div style={{'width': 'calc(100% - 230px)'}}>
                <SoftList split>
                    <li className='header-row'>
                        <span>Account</span>
                        <span>value</span>
                    </li>
                    {data}
                    <li><span /><span><p className='t-green t-bold'>{money(total)}</p></span></li>
                </SoftList>
            </div>
        </div>
        <div className='right'>
            <Link to='/accounts' className='btn'>Edit accounts</Link>
        </div>
    </div>
    return ({ content: accountContent })
}

export const proccessSourceData = incomeSources => {
    if(incomeSources.length < 1) return noData('sources', 'sources')
    let total = 0
    const data = incomeSources.map(acc => {
        const useAmount = convert(acc.amount, acc.rec, 'y')
        total = calcMoney(total, useAmount)
        return <li key={acc.id}>
            <span>{ acc.item } </span>
            <span>
                { convert(acc.amount, acc.rec, acc.rec, 'money') } <br />
                { disRec(acc.rec) }
            </span>
        </li>
    })

    const sourceContent = <div className='content-pad'>
        <SoftList split>
            <li className='header-row'>
                <span>Source</span>
                <span>Amount</span>
            </li>
            {data}
            <li>
                <span>Total</span>
                <span>
                    <p className='t-green t-bold'>
                        {money(total)} <br />
                    </p>
                    {disRec('y')}
                </span>
            </li>
        </SoftList>
        <div className='right'>
            <Link to='/sources' className='btn'>Edit Income</Link>
        </div>
    </div>

    return ({ content: sourceContent, total })
}

export const proccessbudgetData = (budget, total, viewBy) => {
    if(Object.keys(budget).length < 1) return noData('budget', 'budget')

    const contentData = Object.keys(budget).map((bi, index) => {
        const bdItem = budget[bi]
        const mappedBi = bdItem .items.map((biItem, innerIndex)=>
            <li key={'inner-item-' + innerIndex}>
                <span>{biItem.item}</span>
                <span>
                    {convert(biItem.amount, biItem.rec, viewBy, 'money')} <br />
                    {disRec(viewBy)}
                </span>
            </li>
        )
        const usePercent = (convert(bdItem.total, 'm', 'y') / total) * 100
        return(
            <div key={'outer-item-' + index} className='thr mr-20'>
                <SoftList split>
                    <li className='header-row row'>
                        <span>{ up(bi) }</span>
                        <span>
                            { convert(bdItem.total, 'm', viewBy, 'money') } <br />
                        </span>
                        <span className='w-99 pt-10'>
                            <ProgressBar percent={ usePercent } hideShadow title={percent(usePercent)} color='lightgreen' bg='white' height={22} fontColor='green' fontSize='1rem' paddingTop='0' />
                        </span>
                    </li>
                    { mappedBi } 
                </SoftList>
            </div>
        )
    })

    const budgetContent = <div className='content-pad'>
        <div className='row start'>
            { contentData }
        </div>
        <div className='right'>
            <Link to='/budget' className='btn'>Edit budget</Link>
        </div>
    </div>

    return ({
        total: 40,
        content: budgetContent
    })
}