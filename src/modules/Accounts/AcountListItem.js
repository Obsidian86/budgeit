import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { parsedCurrentDate, stepDate, dMatch, getDateRangeArray } from '../components/calendar/dateFunctions'
import RenderLineChart from './LineChart'
const styles = {
    transferCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 0 3px gray',
        padding: '7px',
        borderRadius: '2px',
        marginTop: '22px',
        marginRight: '10px',
        minWidth: '130px',
        backgroundColor: '#fff',
        fontSize: '.83rem'
    },
    toCard: {
        borderTop: '8px solid green'
    },
    fromCard: {
        borderTop: '8px solid gray'
    },
    p: {
        padding: '0',
        margin: '0 0 4px 0'
    },
    tab: {
        backgroundColor: 'green', 
        padding: '4px 6px', 
        borderRadius: '3px', 
        color: '#fff',
        margin: '5px 6px 0 0',
    }
}



const AccountListItem = (props) => {
    const {
        s, 
        a, 
        money,
        Bullet, 
        updateEdittingItem, 
        updateShowForm,
        addAccountToEstimator, 
        updateView, 
        transfers, 
        accounts, 
        handleEditTransfers, 
        parentWidth,
        showOptionsParent,
        updateShowOptions,
        sources,
        budget
    } = props

    const [selectedPoint, updateSelectedPoint] = useState(null)
    const [selectedRangePoint, updateSelectedRangePoint] = useState(null)
    const [range, updateRange] = useState('months')
    const showOptions = showOptionsParent && (a.id + '' === showOptionsParent + '')
    const transfersTo = transfers.filter(tr => tr.toAccount + '' === a.id + '')
    const transfersFrom = transfers.filter(tr => tr.fromAccount + '' === a.id + '')

    let budgetArr = []
    Object.keys(budget).forEach(bi => {
        budgetArr = [...budgetArr, ...budget[bi].items]
    })

    const allItemsArray = [...sources, ...transfers, ...budgetArr].filter(checkItem => {
        return (
            (checkItem.toAccount && checkItem.toAccount + '' === a.id + '') ||
            (checkItem.fromAccount && checkItem.fromAccount + '' === a.id + '')
        )
    })


    const getAccount = (id) => {
        const ac = accounts.filter(acc => acc.id + '' === id + '')
        return ac.length > 0 ? ac[0].name : ''
    }

    const handleClickItem = () => {
        if(showOptions) { updateShowOptions(null)}
        else updateShowOptions(a.id)
    }

    const handleRangePointclick = (e, point) => {
        e.stopPropagation()
        const spl = point.x.split('-')
        const useDate = spl[1] + '-' + spl[2] + '-' + spl[0]
        updateSelectedRangePoint(`Amount: ${money(point.y)} on ${useDate}`)
    }
    const handlePointclick = (e, point) => {
        e.stopPropagation()
        const spl = point.x.split('-')
        const useDate = spl[1] + '-' + spl[2] + '-' + spl[0]
        updateSelectedPoint(`Amount: ${money(point.y)} on ${useDate}`)
    }
    const todaysDate = parsedCurrentDate()

    const getProjectedChartData = () => {
        let points = []
        points.push({ amount: parseFloat(a.amount), date: todaysDate })

        let i = 0
        let dateTrack = stepDate(todaysDate, 'd', 1, true)
        let trackAmount = parseFloat(a.amount)
        const endDate = range === 'months' ? stepDate(dateTrack.split('-'), 'm', 5, true) : stepDate(dateTrack.split('-'), 'y', 5, true)

        let itemMap = {}
        for(const allItem in allItemsArray){
            const item = allItemsArray[allItem]
            const dateRange = getDateRangeArray(item.rec, item.date, endDate)
            for(const i in dateRange){
                if(dateRange[i] !== todaysDate){
                    if(itemMap[dateRange[i]]){
                        itemMap[dateRange[i]].push(item)
                    } else {
                        itemMap[dateRange[i]] = [item]
                    }
                }
            }
        }

        let logList = []
        let logItems = []

        while(i < 2000 && dateTrack !== stepDate(endDate.split('-'), 'd', 1, true)){
            if(itemMap[dateTrack]){
                for(const item in itemMap[dateTrack]){
                    const tr = itemMap[dateTrack][item]
                    const amnt = parseFloat(tr.amount)
                    const toMatch = tr.toAccount + '' === a.id + ''
                    const fromMatch = tr.fromAccount + '' === a.id + ''
                    if (toMatch) {
                        logList.push(`add ${amnt} ${tr.item || '-'}`)
                        logItems.push(item)
                        trackAmount = trackAmount + amnt
                    }
                    if (fromMatch) {
                        logList.push(`sub ${amnt}  ${tr.item || '-'} ${tr.name || '-'}`)
                        logItems.push(item)
                        trackAmount = trackAmount - amnt
                    }
                }
            }
            const monthlyMatch = dMatch(dateTrack, todaysDate, ['d'])
            if(monthlyMatch && a.interest){
                const percent = parseFloat(a.interest) / 100
                trackAmount = trackAmount + ((trackAmount * percent) / 12)
            }
            const matchM = range === 'months' && monthlyMatch
            const matchY = range === 'years' && dMatch(dateTrack, todaysDate, ['m', 'd'])
            if(matchM || matchY){ 
                points.push({ amount: trackAmount, date: dateTrack })
            }
            dateTrack = stepDate(dateTrack.split('-'), 'd', 1, true)
            i++
        }
        return points
    }

    return(
        <li 
            style={{
                borderRadius: '4px',
                flexWrap: 'wrap', 
                cursor: 'pointer',
                boxShadow: showOptions ? '0 0 2px rgba(0,0,0,.3)' : 'none',
                fontWeight: 'bold',
                borderTop: showOptions ? '7px solid green' : 'none',
                borderLeft: showOptions ? '2px dotted green' : 'none',
                borderRight: showOptions ? '2px dotted green' : 'none',
                borderBottom: showOptions ? '7px solid green' : 'none'
            }}
            onClick={handleClickItem}
        >
            <span style={s.intFirst}> <Bullet color={a.liquid ? 'green' : 'orange'} size={12} /> {a.name}</span>
            <span style={s.intRight}>{a.interest}%</span>
            <span style={s.intRight} className={showOptions ? 'mb-10' : null}>{money(a.amount)}</span>
            <span style={{...s.intLast, fontSize: '1.1rem'}} className={showOptions ? 'mb-10' : null}>
                {showOptions ? '-' : '+'}
            </span>
            <div className='row mb-10 start w-100 mt-10'>
                <div className='mt-20 mr-20' style={styles.tab}>Transfers to account: {transfersTo.length}</div>
                <div className='mt-20' style={styles.tab}>Transfers from account: {transfersFrom.length}</div>
                {showOptions && 
                <>
                    <div className='w-99 row start'>
                        { (transfersTo.length + transfersFrom.length > 0) && <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Transfers</h3> }
                        {transfersTo.map(tr => {
                            return(
                                <div key={tr.id} style={{...styles.transferCard, ...styles.toCard}}>
                                    <p style={{...styles.p, color: '#888', margin: '0'}} className='muted'>From account</p>
                                    <p style={styles.p}>{getAccount(tr.fromAccount)}</p>
                                    <p style={styles.p}>{money(tr.amount)}</p>
                                    <button className='btn green narrow' onClick={(e) =>{
                                        e.stopPropagation()
                                        handleEditTransfers(tr)
                                    }}>Edit</button>
                                </div>
                            )
                        })}
                        {transfersFrom.map(tr => {
                            return(
                                <div key={tr.id} style={{...styles.transferCard, ...styles.fromCard}}>
                                    <p style={{...styles.p, color: '#888', margin: '0'}} className='muted'>To account</p>
                                    <p style={styles.p}>{getAccount(tr.toAccount)}</p>
                                    <p style={styles.p}>{money(tr.amount)}</p>
                                    <button className='btn green narrow' onClick={(e) =>{
                                        e.stopPropagation()
                                        handleEditTransfers(tr)
                                    }}>Edit</button>
                                </div>
                            )
                        })}
                    </div>

                    {/* VALUE OVER TIME */}
                    {(a.accountSnapshots && [...a.accountSnapshots].filter(ash => ash.date !== todaysDate).length > -1) &&
                        <div onClick={e => e.stopPropagation()} style={{ width: '99%', marginLeft: '-4px' }}>
                            <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Value over time</h3>
                            <p className='m-0 pl-5 pt-5'>{
                                selectedPoint ? selectedPoint : 'Click point to view info'
                            }</p>
                            <RenderLineChart
                                parentWidth={parentWidth}
                                handlePointclick={handlePointclick}
                                inItemId={'graph-vot' + a.id}
                                inData= {[...a.accountSnapshots, {
                                    amount: a.amount, 
                                    date: todaysDate
                                }]}
                                parser={(i) => i.getMonth() + 1 + '-' + i.getDate()}
                            />
                        </div>
                    }
                    {/* PROJECTED VALUE OVER TIME */}
               
                    <div onClick={e => e.stopPropagation()} style={{ width: '99%', marginLeft: '-4px' }}>
                        <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Projected value over time </h3>
                        <p className='m-0 pl-5 pt-5'>{
                            selectedRangePoint ? selectedRangePoint : 'Click point to view info'
                        }</p>
                        <div className='mt-5 ml-5'>
                            <button style={{margin: '5px'}} className={`btn narrow ${range === 'months' ? 'blue' : 'gray'}`} onClick={()=>updateRange('months')}>5 Month</button>
                            <button style={{margin: '5px'}} className={`btn narrow ${range === 'years' ? 'blue' : 'gray'}`} onClick={()=>updateRange('years')}>5 Years</button>
                        </div>
                        {
                            <RenderLineChart
                                inItemId={'graph-projected' + a.id}
                                parentWidth={parentWidth}
                                handlePointclick={handleRangePointclick}
                                inData={[...getProjectedChartData()]}
                                parser={(i) => i.getMonth() + 1 + '-' + i.getDate()}
                            />
                        }
                        <p className='muted ml-5'>Base on interest/transfers/budget items</p>
                    </div>
                    <div className='right' style={{ paddingTop: '15px', marginTop: '5px', width: '98%' }}>
                        <Link to='/savings' className='btn blue' style={{textDecoration: 'none'}} onClick={()=> addAccountToEstimator(a)}>
                            Add to estimator
                        </Link>
                        <button className='btn' onClick={()=> {
                            const n = new Promise((resolve, reject)=> resolve(updateEdittingItem(a)) )
                            n.then(()=>updateShowForm(true))
                            .then(()=>updateView('accountForm', 'accountsModule'))
                        }}> Edit account
                        </button>
                    </div>
                </>}
            </div>
        </li>
    )
}

export default AccountListItem