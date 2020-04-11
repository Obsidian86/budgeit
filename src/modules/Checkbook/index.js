import React, { useContext, useState } from 'react'
import MainContext from '../../providers/MainContext'
import { money } from '../../utilities/convert'
import ContentBox from '../interface/ContentBox'
import AccountList from './AccountList'
import StyledAccountModule from './styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faPlusCircle, faUniversity } from "@fortawesome/free-solid-svg-icons";
import Transaction from './Transactions'
import { IP } from '../../utilities/formUtilities'
import { Link } from 'react-router-dom'
import transactionDialog from './transactionDialog.js'

const Checkbook = () => {
    const p = useContext(MainContext)
    const [filter, updateFilter] = useState('')
    const [message, updateMessage] = useState(null)
    const [selectedAccount, updateSelectedAccount] = useState(null)

    // if no account selected, use first account (id)
    const accountsCount = p.accounts.length
    const useSelected = selectedAccount ? selectedAccount : accountsCount > 0 ? p.accounts[0].id : 0
    const accountListProps = {
        accounts: p.accounts, 
        selectedAccount: useSelected, 
        updateSelectedAccount,
        money
    }

    // filter account by selected account id
    const transactionAccount = p.accounts.filter(acc => acc.id === useSelected)

    // show transactiondata for that account
    let transactionData = p.transactions[useSelected] ? p.transactions[useSelected] : []
    const setTransactionDialog = (mode, transaction) => 
        transactionDialog(p.setDialog, mode, submitDialogForm, transactionAccount[0], p.budget, transaction)

    //load transactions for account
    const loadTransactions = async () => {
        updateMessage('Loading transactions')
        await p.loadTransactions(useSelected)
        updateMessage(null)
    }
    const submitDialogForm = async (formData, mode) => {
        updateMessage('Submitting transaction')
        const action = mode === 'add' ? p.submitTransaction : p.updateTransaction
        const result = await action(formData, transactionAccount[0])
        updateMessage(result.message)
    }
    const handleDelete = async (delTransaction) => {
        p.setDialog({
            open: true,
            header: `Delete transaction`,
            yesText: 'Delete',
            noText: 'Cancel',
            message: 'Are you sure you want to delete this transaction for ' + money(delTransaction.amount) + '?',
            reject: () => null,
            confirm: async() => {
                updateMessage('Deleting transaction')
                const result = await p.deleteTransaction(transactionAccount[0], delTransaction)
                updateMessage(result.message)
            }
          })
    }
    
    if(
        useSelected !== 0
        && useSelected !== '0' 
        && !p.hasNoTransactions.includes(useSelected)
        && !p.transactions[useSelected]
        && message !== 'Loading transactions'
    ) loadTransactions()

    return (
        <ContentBox title='Checkbook' icon={<FontAwesomeIcon icon={faMoneyCheck} />} itemId='checkbookModule'>
            <div className='d-flex right mt-60'>
                <div className='controls'>
                    <Link to='/accounts' className='mr-10'>
                        <IP type='btn_blue' label='Accounts' style={{marginRight: '10px'}} icon={<FontAwesomeIcon icon={faUniversity} />} />
                    </Link>
                    <IP 
                        type='btn' 
                        label='Add transaction' 
                        style={{marginRight: '10px'}} 
                        icon={<FontAwesomeIcon icon={faPlusCircle} />} 
                        onChange={() => setTransactionDialog('add', null)}
                    />
                </div>
            </div>
            <StyledAccountModule className='row mx'>
                <div className={`message-container ${message ? 'message-open' : ''}`}>
                    <p className='important'> <span onClick={()=> updateMessage(null)}>x</span> {message ? message : ''} </p>
                </div>
                <div className='smPlus accList ml-n-15' >
                    <AccountList {...accountListProps} />
                </div>
                <div className='lg mr-n-15'>
                    <strong className='d-block' style={{marginTop: '20px'}}>Transactions</strong>
                    <div className='search-box'>
                        <span>Search </span>
                        <input type='text' value={filter} placeholder='Search transactions' onChange={(e) => updateFilter(e.target.value)} />
                        <span className='clear-button' onClick={() => updateFilter('')}>Clear</span>
                    </div> 
                    {
                        transactionData.length < 1 ? 
                            <p className='center no-content'>
                                    No transactions for account { transactionAccount.length > 0 && transactionAccount[0].name}
                            </p> :
                            [...transactionData].map((tr, i) => <Transaction key={i} tr={tr} filter={filter} handleDelete={handleDelete} setTransactionDialog={setTransactionDialog} />)
                    }
                    {!(p.hasNoTransactions.includes(useSelected)) && 
                        <div className='center mt-40 mb-40'>
                            <button 
                                onClick={()=> loadTransactions()}
                                className='btn green'
                            >
                                    Load more transactions
                            </button>
                        </div>
                    }
                </div>
            </StyledAccountModule>
        </ContentBox>
    )
}

export default Checkbook
