import React, { useContext, useState } from 'react'
import MainContext from '../../providers/MainContext'
import { money } from '../../utilities/convert'
import ContentBox from '../interface/ContentBox'
import AccountList from './AccountList'
import StyledAccountModule from './styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import Transaction from './Transactions'

const trans = {
    before: '111.23',
    after: '412.23',
    type: 'widthrawl',
    amount: '20.23',
    payee: 'food service',
    category: 'food',
    id: null,
    date: Date.now()
}

const tempTrans = []
for(let i=0; i< 20; i++){
    tempTrans.push({
        ...trans,
        id: i,
        type: i % 5 === 0 ? 'deposit' : i % 7 !== 0 ? 'withdrawl' : 'transfer'
    })
}

const Checkbook = () => {
    const p = useContext(MainContext)
    const [selectedAccount, updateSelectedAccount] = useState(null)
    
    const accounts = p.accounts.map(element => {
        return ({...element, transactions: tempTrans})
    });

    const accountsCount = p.accounts.length
    const useSelected = selectedAccount ? selectedAccount : accountsCount > 0 ? p.accounts[0].id : 0
    const accountListProps = {
        accounts, 
        selectedAccount: useSelected, 
        updateSelectedAccount,
        money
    }
    const transactionAccount = accounts.filter(acc => acc.id === useSelected)
    let transactionData = transactionAccount.length > 0 ? transactionAccount[0].transactions : []

    return (
        <ContentBox title='Checkbook' icon={<FontAwesomeIcon icon={faMoneyCheck} />} itemId='checkbookModule'>
            <StyledAccountModule className='row mx'>
                <div className='smPlus'>
                    <strong>Accounts</strong>
                    <AccountList {...accountListProps} />
                </div>
                <div className='lg'>
                    <strong>Transactions</strong>
                    {
                        transactionData.map(tr => <Transaction tr={tr} />)
                    }
                </div>
            </StyledAccountModule>
        </ContentBox>
    )
}

export default Checkbook
