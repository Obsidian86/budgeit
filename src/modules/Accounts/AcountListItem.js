import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import LineChart from 'react-linechart'
import { parsedCurrentDate } from '../components/calendar/dateFunctions'

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
        color: '#fff'
    }
}

const renderChart = (inData, handleClick, parentWidth) => {
    let data = [{ color: 'green', points: [] }]
    inData.forEach(ss => {
        const d = ss.date.split('-')
        const useDate = `${d[2]}-${d[0]}-${d[1]}`
        data[0].points.push({ x: useDate, y: parseFloat(ss.amount) })
    })
    return (
        <LineChart
            onPointClick={handleClick}
            hideXLabel
            hideYLabel
            hideXAxis
            width={parentWidth}
            pointRadius={8}
            height={400}
            ticks={5}
            data={data}
            isDate={true}
        />
    )
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
        updateShowOptions
    } = props

    console.log(a)

    const [selectedPoint, updateSelectedPoint] = useState(null)
    const showOptions = showOptionsParent && (a.id + '' === showOptionsParent + '')

    const transfersTo = transfers.filter(tr => tr.toAccount + '' === a.id + '')
    const transfersFrom = transfers.filter(tr => tr.fromAccount + '' === a.id + '')

    const getAccount = (id) => {
        const ac = accounts.filter(acc => acc.id + '' === id + '')
        return ac.length > 0 ? ac[0].name : ''
    }

    const handleClickItem = () => {
        if(showOptions) { updateShowOptions(null)}
        else updateShowOptions(a.id)
    }

    const handlePointclick = (e, point) => {
        e.stopPropagation()
        const spl = point.x.split('-')
        const useDate = spl[1] + '-' + spl[2] + '-' + spl[0]
        updateSelectedPoint(`Amount: ${money(point.y)} on ${useDate}`)
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
            <div className='row mb-10 start'>
                <div className='mt-20 mr-20' style={styles.tab}>Transfers to account: {transfersTo.length}</div>
                <div className='mt-20' style={styles.tab}>Transfers from account: {transfersFrom.length}</div>
                {showOptions && <div className='w-99 row start'>
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
                </div>}

                {/* VALUE OVER TIME */}
                {showOptions && (a.accountSnapshots && a.accountSnapshots.length > 1) &&
                    <div onClick={e => e.stopPropagation()} style={{ width: '95%', marginLeft: '-4px' }}>
                        <h3 className='w-99 t-green' style={{marginTop: '20px'}}>Value over time</h3>
                        <p className='m-0 pl-5 pt-5'>{
                            selectedPoint ? selectedPoint : 'Click point to view info'
                        }</p>
                        {renderChart(
                            [...a.accountSnapshots, {amount: a.amount, date: parsedCurrentDate()}],
                            handlePointclick,
                            parentWidth
                        )}
                    </div>
                }
                {showOptions && 
                <div className='right' style={{ paddingTop: '15px', marginTop: '5px', width: '98%'}}>
                    <Link to='/savings' className='btn blue' style={{textDecoration: 'none'}} onClick={()=> addAccountToEstimator(a)}>
                        Add to estimator
                    </Link>
                    <button className='btn' onClick={()=> {
                        const n = new Promise((resolve, reject)=> resolve(updateEdittingItem(a)) )
                        n.then(()=>updateShowForm(true))
                        .then(()=>updateView('accountForm', 'accountsModule'))
                    }}> Edit account
                    </button>
                </div>}
            </div>
        </li>
    )
}

export default AccountListItem