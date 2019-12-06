import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'

const SnapShots = () => {
    const p = useContext(MainContext)
    // addSnapShot deleteSnapShot, snapshots


    const handleDelete = index => {
        p.setDialog({
            open: true,
            header: 'Delete snapshot', 
            message: <>Are you sure you want to delete this snapshot? <br /> This can not be undone.</>, 
            confirm: ()=> p.deleteSnapShot(index),
            reject: ()=> null 
        }) 
    }

    const handleCreate = () => {
        p.addSnapShot({
            date: '12-1-2019',
            currentLiquid: 2100,
            currentTotal: 2200,
            projectedEndOfYearTotal: 2500,
            projectedEndOfYearLiquid: 2400
        })
    }

    return(
        <ContentBox title='Snapshots'>
            <button onClick={() => handleCreate()} className='btn green'>Create snapshot</button>
            {p.snapshots.map((sh, i) => 
                <div key={i} className='row'>
                    <span>
                        <button onClick={()=> handleDelete(i)} className='btn red'>DELETE BTN</button>
                    </span>
                    <div>
                        <p>{ sh.date }</p>
                        <p>{ sh.currentTotal }</p>
                    </div>
                </div>
            )}
        </ContentBox>
    )
}

export default SnapShots