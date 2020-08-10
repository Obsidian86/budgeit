import React from 'react'
import { calcMoney, money, convert, disRec, up, percent } from '../../utilities/convert'
import Bullet from '../interface/Bullet'
import TableRow from '../interface/TableRow'
import ProgressBar from '../interface/ProgressBar'
import ChartContainer from '../components/ChartContainer'
import { colors } from '../../styles/colors'
import { Link } from 'react-router-dom'
import percents from '../../utilities/suggested'

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
        return <TableRow key={acc.id} tData={[<><Bullet color={color} />{ acc.name }</>, money(acc.amount)]} pattern={[50, 50]} />
    })
    const accountContent = <div className='content-pad'>
        <div className='row between'>
            <ChartContainer styles={{'width': '190px', 'margin': '0 auto', 'marginBottom': '20px'}} data={chartData} />
            <div style={{'width': 'calc(100% - 230px)', 'margin': '0 auto', minWidth: '300px'}} className='smPlus reRow' >
                <TableRow className='headerRow' tData={['Account', 'Value']} pattern={[50, 50]} />
                {data}
                <TableRow className='headerRow' round={false} tData={['', <p className='t-bold'>{money(total)}</p>]} pattern={[50, 50]} />
            </div>
        </div>
        <div className='right pt-10'>
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
        return <TableRow 
            key={acc.id} 
            tData={[
                acc.item,
                <>
                    { convert(acc.amount, acc.rec, acc.rec, 'money') } <br />
                    { disRec(acc.rec) }
                </>
            ]}
            pattern={[50, 50]}
        />
    })

    const sourceContent = <div className='content-pad'>
        <div>
            <TableRow className='headerRow' tData={['Source', 'Amount']} pattern={[50, 50]}/>
            {data}
            <TableRow 
                pattern={[50, 50]}
                className='headerRow' 
                round={false}
                tData={['total', <>
                    <p className='t-bold'>
                        {money(total)} <br />
                    </p>
                    {disRec('y')}
                </>]}
            />
        </div>
        <div className='right pt-10'>
            <Link to='/sources' className='btn'>Edit Income</Link>
        </div>
    </div>

    return ({ content: sourceContent, total })
}

export const proccessbudgetData = (budget, total, viewBy) => {
    if(Object.keys(budget).length < 1) return noData('budget', 'budget')

    const contentData = Object.keys(budget).map((bi, index) => {
        const bdItem = budget[bi]
        const mappedBi = bdItem.items.map((biItem, innerIndex)=>
            <TableRow 
                key={'inner-item-' + innerIndex}
                pattern={[50, 50]}
                tData={[
                    biItem.item,
                    <>
                        {convert(biItem.amount, biItem.rec, viewBy, 'money')} <br />
                        {disRec(viewBy)}
                    </>
                ]}
            />
        )
        const usePercent = (convert(bdItem.total, 'm', 'y') / total) * 100
        const progBar = <div style={{
                'width': 'calc(100% - 5px)',
                'padding': '0',
                'paddingBottom': '3px'
            }}>
                <ProgressBar 
                    inConStyles={{
                        'paddingLeft': '0',
                        'paddingRight': '0',
                        'paddingTop': '2px',
                        'paddingBottom': '23px'
                    }}
                    marks={percents[up(bi)] || null}
                    percent={ usePercent } 
                    hideShadow title={percent(usePercent)} 
                    color='lightgreen' bg='white' height={3} 
                    fontColor='green' fontSize='1rem' paddingTop='0' 
                />
        </div>
        return(
            <div key={'outer-item-' + index} className='mb-10 spl-500'>
                <TableRow 
                    pattern={[45, 45, 90]}
                    wrap
                    headerRow 
                    tData={[
                        up(bi), 
                        convert(bdItem.total, 'm', viewBy, 'money')
                    ]}
                >
                    { progBar }
                    </TableRow>
                { mappedBi } 
            </div>
        )
    })

    const budgetContent = <div className='content-pad'>
        <div className='row'>
            { contentData }
        </div>
        <div className='right pt-10'>
            <Link to='/budget' className='btn'>Edit budget</Link>
        </div>
    </div>

    return ({
        total: 40,
        content: budgetContent
    })
}