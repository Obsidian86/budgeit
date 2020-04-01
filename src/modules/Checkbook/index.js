import React, { useContext, useState } from 'react'
import MainContext from '../../providers/MainContext'
import { money, calcMoney } from '../../utilities/convert'
import ContentBox from '../interface/ContentBox'
import AccountList from './AccountList'
import StyledAccountModule from './styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";


const Checkbook = () => {
    const p = useContext(MainContext)
    const [selectedAccount, updateSelectedAccount] = useState(null)
    
    const accountsCount = p.accounts.length
    const accountListProps = {
        accounts: p.accounts, 
        selectedAccount: selectedAccount ? selectedAccount : accountsCount > 0 ? p.accounts[0].id : 0, 
        updateSelectedAccount,
        money
    }
    return (
        <ContentBox title='Checkbook' icon={<FontAwesomeIcon icon={faMoneyCheck} />} itemId='checkbookModule'>
            <StyledAccountModule className='row mt-40 mx'>
                <div className='smPlus'>
                    <strong>Accounts</strong>
                    <AccountList {...accountListProps} />
                </div>
                <div className='lg'>
                    <strong>transactions</strong>
                </div>
            </StyledAccountModule>
        </ContentBox>
    )
}

export default Checkbook
