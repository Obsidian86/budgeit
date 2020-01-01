import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import { money } from '../utilities/convert'
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';
import { parsedCurrentDate } from './components/calendar/dateFunctions'
import { IP } from '../utilities/formUtilities';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const colors = ['green', 'blue', 'gray', 'black', 'salmon', 'orange']

const SnapShotChart = ({inData, parentWidth = 500, showItems}) => {

    let data = [
        {
            // totals
            color: colors[0],
            points: []
        },
        {
            // liquid
            color: colors[1],
            points: []
        },
        {
            // non liquid
            color: colors[2],
            points: []
        },
        {
            // projected end of year total
            color: colors[3],
            points: []
        },
        {
            // projected end of year liquid
            color: colors[4],
            points: []
        },
        {
            // projected end of year non liquid
            color: colors[5],
            points: []
        },
    ]

    for(const da in inData){
        showItems['Totals'] && data[0].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].currentTotal) })
        showItems['Liquid'] && data[1].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].currentLiquid) })
        showItems['Non Liquid'] && data[2].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].currentTotal) - parseFloat(inData[da].currentLiquid) })
        showItems['End of year total'] && data[3].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].projectedEndOfYearTotal) })
        showItems['End of year liquid'] && data[4].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].projectedEndOfYearLiquid) })
        showItems['End of year non liquid'] && data[5].points.push({ x:(parseInt(da) + 1), y: parseFloat(inData[da].projectedEndOfYearTotal) - parseFloat(inData[da].projectedEndOfYearLiquid) })
    }

    return(
        <LineChart
            hideXLabel
            hideYLabel
            yMin='100'
            width={parentWidth}
            height={500}
            data={data}
        />
    )
}

const SnapShots = () => {
    const p = useContext(MainContext)
    const [parentWidth, updateParentWidth] = useState(100)
    const [hideSnapshots, updateHideSnapshots] = useState(true)
    const [showItems, updateShowItems] = useState({
        'Totals': true,
        'Liquid': false,
        'Non Liquid': false,
        'End of year total': true,
        'End of year liquid': false,
        'End of year non liquid': false,
    })

    const s = {
        snapShotsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: '35px',
        },
        snapShot: {
            width: `${100 / (p.snapshots.length < 4 ? p.snapshots.length : 4) - 3}%`,
            borderRadius: '4px',
            boxShadow: '0 0 6px #d9d9d9',
            justifyContent: 'flex-start',
            marginBottom: '16px',
            padding: '7px 0',
            fontWeight: 'bold',
            color: 'lightgray',
            minWidth: '150px',
            position: 'relative',
            maxWidth: '270px'
        },
        btnContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '20px',
            width: '80px'
        },
        p: {
            margin: '0',
            padding: '0',
            textAlign: 'left',
            marginLeft: '10px'
        },
        n: {
            fontSize: '1.2rem',
            color: 'green'
        },
        eoy: {
            color: '#999'
        },
        d: {
            width: '100%',
            marginBottom: '4px',
            marginLeft: '13px'
        },
        nu: {
            position: 'absolute',
            right: '8px',
            top: '5px'
        },
        cBoxes: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '20px'
        },
        cBox: {
            display: 'block',
            margin: 0,
            padding: '9px 0',
            width: `14%`,
            minWidth: '175px',
            fontSize: '.8rem'
        },
        remark: {
            textAlign: 'left',
            display: 'block',
            width: '94%',
            margin: '0 auto',
            position: 'relative',
            left: '-4px',
            marginBottom: '30px',
            marginTop: '50px'
        }
    }

    
    useEffect(() => {
        const getWidth = () => {
            const ss = document.getElementById('snapshots')
            ss && updateParentWidth(ss.offsetWidth - 30)
        }
        getWidth()
        window.addEventListener('resize', () => getWidth())
        return function(){window.removeEventListener('resize', () => getWidth())}
    })

    const handleDelete = index => {
        p.setDialog({
            open: true,
            header: 'Delete snapshot', 
            message: <>Are you sure you want to <br /> delete this snapshot? <br /> This can not be undone.</>, 
            confirm: ()=> p.deleteSnapShot(index),
            reject: ()=> null 
        }) 
    }

    const handleCreate = () => {
        let total = 0
        let liquid = 0
        for(const ac in p.accounts){
            let a = p.accounts[ac]
            total = total + a.amount
            if(a.liquid) liquid = liquid + a.amount
        }
        p.addSnapShot({
            date: parsedCurrentDate(),
            currentLiquid: liquid,
            currentTotal: total,
            projectedEndOfYearTotal: p.eoyTotal,
            projectedEndOfYearLiquid: p.eoyLiquid
        })
    }

    let snapShotIndex = p.snapshots.length - 1
    return(
        <ContentBox title='Snapshots' itemId='snapshots' >
            <div className='mt-40 mb-40'>
                <p className='remark' style={s.remark}>Create account snapshots to track trends and projected amounts over time.</p>
                {p.snapshots && p.snapshots.length > 1 && <><label>Toggle chart values</label>
                <div style={s.cBoxes}>
                    { Object.keys(showItems).map((si, index) => 
                        <IP 
                            type='checkbox' 
                            alias={si} 
                            data={showItems} 
                            key={si} 
                            style={{...s.cBox, color: colors[index]}}
                            onChange={()=> updateShowItems({...showItems, [si]: !showItems[si]})} 
                            label={si} 
                        />
                    )}
                </div> </>}
            </div>
            {p.snapshots && p.snapshots.length > 1 && <SnapShotChart inData={p.snapshots} parentWidth={parentWidth} showItems={showItems} />}
            <button onClick={() => updateHideSnapshots(!hideSnapshots)} className={`btn ${!hideSnapshots ? 'red' : 'blue'}`}>
                <FontAwesomeIcon icon={ !hideSnapshots ? faEyeSlash : faEye} />&nbsp;&nbsp;
                <span>{hideSnapshots ? 'Show' : 'Hide'} snapshots</span>
            </button>
            <button onClick={() => handleCreate()} className='btn green'><FontAwesomeIcon icon={faCamera} />&nbsp;&nbsp;<span>Create snapshot</span></button>
            <div style={s.snapShotsContainer}>
                {!hideSnapshots && [...p.snapshots].reverse().map((sh, i) =>
                    <div key={i} className='row' style={s.snapShot}>
                        <p style={{...s.p, ...s.d}}>{ sh.date }</p>
                        <p style={{...s.p, ...s.nu}}>{ p.snapshots.length - i }</p>
                        <span style={s.btnContainer}>
                            <button onClick={()=> handleDelete(snapShotIndex - i)} className='btn red'>Delete</button>
                        </span>
                        <div>
                            <p style={{...s.p, ...s.eoy}}>EOY: { money(sh.projectedEndOfYearTotal) }</p>
                            <p style={{...s.p, ...s.n}}>{ money(sh.currentTotal) }</p>
                        </div>
                    </div>
                )}
            </div>
        </ContentBox>
    )
}

export default SnapShots