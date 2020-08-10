import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../providers/MainContext'
import ContentBox from '../interface/ContentBox'
import { money } from '../../utilities/convert'
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import { parsedCurrentDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faEyeSlash, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import s from './styles'
const colors = ['green', 'blue', 'gray', 'black', 'salmon', 'orange']

const SnapShotChart = ({inData, parentWidth = 500, showItems, updateClickedPoint}) => {

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
        const d = inData[da].date.split('-')
        const useDate = `${d[2]}-${d[0]}-${d[1]}`
        showItems['Totals'] && data[0].points.push({ x: useDate, y: parseFloat(inData[da].currentTotal) })
        showItems['Liquid'] && data[1].points.push({ x: useDate, y: parseFloat(inData[da].currentLiquid) })
        showItems['Non Liquid'] && data[2].points.push({ x: useDate, y: parseFloat(inData[da].currentTotal) - parseFloat(inData[da].currentLiquid) })
        showItems['End of year total'] && data[3].points.push({ x: useDate, y: parseFloat(inData[da].projectedEndOfYearTotal) })
        showItems['End of year liquid'] && data[4].points.push({ x: useDate, y: parseFloat(inData[da].projectedEndOfYearLiquid) })
        showItems['End of year non liquid'] && data[5].points.push({ x: useDate, y: parseFloat(inData[da].projectedEndOfYearTotal) - parseFloat(inData[da].projectedEndOfYearLiquid) })
    }

    return(
        <LineChart
            onPointClick={(event, point)=>updateClickedPoint(point)}
            hideXLabel
            hideYLabel
            yMin='100'
            width={parentWidth}
            height={500}
            data={data}
            isDate={true}
        />
    )
}

const SnapShots = ({nonLoad}) => {
    const p = useContext(MainContext)
    
    const [parentWidth, updateParentWidth] = useState(100)
    const [hideSnapshots, updateHideSnapshots] = useState(true)
    const [showSH, updateShowSH] = useState(0)
    const [showPerPage, updateShowPerPage] = useState(p.isMobile ? 5 : 10)
    const [clickedPont, updateClickedPoint] = useState(null)
    const [showItems, updateShowItems] = useState({
        'Totals': true,
        'Liquid': false,
        'Non Liquid': false,
        'End of year total': true,
        'End of year liquid': false,
        'End of year non liquid': false,
    })

    const getWidth = () => {
      const ss = document.getElementById('snapshots')
      ss && updateParentWidth(ss.offsetWidth - 30)
    }
    useEffect(() => {
        getWidth()
        window.addEventListener('resize', getWidth)
        return function(){window.removeEventListener('resize', getWidth)}
    })

    const handleDelete = index => {
        p.setDialog({
            open: true,
            header: 'Delete snapshot', 
            message: <>Are you sure you want to delete this snapshot? <br /> This can not be undone.</>, 
            confirm: ()=> p.deleteSnapShot(index),
            reject: ()=> null 
        }) 
    }
    const changeCount = (direction) => {
        let newShowSH = showSH
        if(direction === 'backward') newShowSH = newShowSH + 1
        if(direction === 'forward') newShowSH = newShowSH - 1
        if(direction === 'current') newShowSH = 0
        if(newShowSH < 1) newShowSH = 0
        if(newShowSH > (p.snapshots.length - showPerPage)) newShowSH = p.snapshots.length - showPerPage
        updateShowSH(newShowSH)
    }
    const handleCreate = () => {
        let total = 0
        let liquid = 0
        for(const ac in p.accounts){
            let a = p.accounts[ac]
            total = total + parseFloat(a.amount)
            if(a.liquid) liquid = liquid + parseFloat(a.amount)
        }
        p.addSnapShot({
            date: parsedCurrentDate(),
            currentLiquid: liquid,
            currentTotal: total,
            projectedEndOfYearTotal: p.eoyTotal,
            projectedEndOfYearLiquid: p.eoyLiquid
        })
    }


    const chartSnapShots = (p.snapshots.length <= showPerPage) ?
        [...p.snapshots] : [...p.snapshots].splice((p.snapshots.length - showPerPage - showSH), showPerPage)

    const displayOptions = [{v: 5, d: 'Show 5'}, {v: 10, d: 'Show 10'}, {v: 15, d: 'Show 15'}, {v: 20, d: 'Show 20'}, {v: 25, d: 'Show 25'}]
    let snapShotIndex = p.snapshots.length - 1
    return(
        <ContentBox title='Snapshots' itemId='snapshots' icon={<FontAwesomeIcon icon={faCameraRetro} />} exClass={nonLoad ? 'hide' : ''} >
            <div className='mt-40 mb-40'>
                <p className='remark' style={s.remark}>Create account snapshots to track trends and projected amounts over time.</p>
                {p.snapshots && p.snapshots.length > 1 && <><label>Toggle displayed elements</label>
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
            {chartSnapShots.length > 1 && 
                <div className='container row between info-container'>
                    <div>
                        <IP 
                            type='drop' alias='showCount' 
                            style={{styles: 'width:92%; margin: 20px auto; padding: 12px 10px;'}} 
                            options={displayOptions} onChange={(v)=> updateShowPerPage(v)}
                            data={{'showCount': showPerPage}}
                        />
                    </div>
                    <h3>{ clickedPont ?
                        `${clickedPont.x.split('-')[1]}-${clickedPont.x.split('-')[2]}-${clickedPont.x.split('-')[0]} | ${money(clickedPont.y)}` 
                            : 'Click point to view' }
                    </h3>
                    <h3> {chartSnapShots[0].date} - {chartSnapShots[chartSnapShots.length -1].date} </h3>
                </div>}
            {p.snapshots && p.snapshots.length > 1 && <SnapShotChart inData={chartSnapShots} parentWidth={parentWidth} showItems={showItems} updateClickedPoint={updateClickedPoint} />}
            {p.snapshots && p.snapshots.length > showPerPage && 
            <div className='container'>
                <div className='grouping mt-10 mb-40 controls'>
                    <button onClick={()=>changeCount('backward')} className='btn' disabled={showSH === (p.snapshots.length - showPerPage)}>Previous</button>
                    <button onClick={()=>changeCount('forward')} className='btn' disabled={showSH === 0}>Next</button>
                    <button onClick={()=>changeCount('current')} className='btn' disabled={showSH === 0}>Current</button>
                </div>
            </div>
            }
            {p.snapshots.length > 0 && <button onClick={() => updateHideSnapshots(!hideSnapshots)} className={`btn ${!hideSnapshots ? 'red' : 'blue'}`}>
                <FontAwesomeIcon icon={ !hideSnapshots ? faEyeSlash : faEye} />&nbsp;&nbsp;
                <span>{hideSnapshots ? 'Show' : 'Hide'} snapshots</span>
            </button>}
            <button onClick={() => handleCreate()} className='btn green'><FontAwesomeIcon icon={faCamera} />&nbsp;&nbsp;<span>Create snapshot</span></button>
            <div style={s.snapShotsContainer}>
                {!hideSnapshots && [...p.snapshots].reverse().map((sh, i) =>
                    <div key={i} className='row' style={{width: `${100 / (p.snapshots.length < 4 ? p.snapshots.length : 4) - 3}%`, ...s.snapShot}}>
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