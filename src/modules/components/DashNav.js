import React from 'react'
import { IP } from '../../utilities/formUtilities'

const DashNav = ({Link, step, updateAccData, accData}) =>{
    return(
        <div className='right dashNav' style={{width: '97%', marginBottom: '10px'}}>
            <nav>
                <Link to='/'>Home</Link>
                {step > 0 && <Link to='/budget'>Budget</Link>}
                <Link to='/savings'>Savings</Link>
                <Link to='/accounts'>Accounts</Link>
                <Link to='/calendar'>Calendar</Link>
            </nav>
            <IP type={`btn_narrow${!accData ? '_green' : '_red'}`}
                style={{marginRight: '0', marginTop: '4px', marginBottom: '13px', alignSelf: 'flex-start'}}
                onChange={()=>updateAccData(!accData)} label='Export / import accounts'
            />
        </div>
    )}

export default DashNav