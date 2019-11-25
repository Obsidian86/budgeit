import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import SoftList from './interface/SoftList'
import { money } from '../utilities/convert'


const Accounts = () => {
    const p = useContext(MainContext)

    let total = 0
    const accountList = p.accounts.map((a, i) => {
        total = total + a.amount
        return (<li key={i}><span>{a.name}</span><span>{money(a.amount)}</span></li>)
    })

    return (
        <ContentBox title='Accounts' exClass='md' >
            <SoftList split className='mt-40'>
                {accountList}
            </SoftList>
            <div className='right'><h3>{money(total)}</h3> </div>
            <div className='right'>
                <button className='btn'>Add account</button>
            </div>
            <div> acc analysis </div>
        </ContentBox>
    )
}

export default Accounts