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
import TransactionDialog from './transactionDialog.js'

const Checkbook = () => {
    const p = useContext(MainContext)
    const [filter, updateFilter] = useState('')
    const [message, updateMessageData] = useState(null)
    const [selectingAccount, updateSelectingAccount] = useState(false)
    const [selectedAccount, updateSelectedAccount] = useState(null)
    const [showTransactionDialog, updateShowTransactionDialog] = useState({ mode: null, transaction: null, show: false })
    // if no account selected, use first account (id)
    const accountsCount = p.accounts.length
    const useSelected = selectedAccount ? selectedAccount : accountsCount > 0 ? p.accounts[0].id : 0

    const accountListItemClick = selectedAccount => {
        updateSelectedAccount(selectedAccount)
        p.isMobile && updateSelectingAccount(false)
    }

    const accountListProps = {
        accounts: p.accounts,
        minimize: p.isMobile && !selectingAccount,
        selectedAccount: useSelected,
        updateSelectedAccount: accountListItemClick,
        money
    }

    const updateMessage = (content, color = 'green') => {
        if (content) {
            updateMessageData({ content, color })
        } else {
            updateMessageData(null)
        }
    }

    // filter account by selected account id
    const transactionAccount = p.accounts.filter(acc => acc.id === useSelected)

    // show transactiondata for that account
    let transactionData = p.transactions[useSelected] ? p.transactions[useSelected] : []
    const setTransactionDialog = (mode, transaction, show = true) => updateShowTransactionDialog({ mode, transaction, show })

    //load transactions for account
    const loadTransactions = async () => {
        updateMessage('Loading transactions', 'lightblue')
        await p.loadTransactions(useSelected)
        updateMessage(null)
    }
    const submitDialogForm = async (inFormData, mode) => {
        let formData = {
            ...inFormData,
            type: inFormData.type === 'payment' ? 'withdraw'
                : inFormData.type === 'charge' ? 'deposit'
                    : inFormData.type
        }
        updateMessage('Submitting transaction', 'lightblue')
        const action = mode === 'add' ? p.submitTransaction : p.updateTransaction
        const result = await action(formData, transactionAccount[0])
        updateMessage(result.message, 'green')
    }
    const handleDelete = async (delTransaction) => {
        p.setDialog({
            open: true,
            header: `Delete transaction`,
            yesText: 'Delete',
            noText: 'Cancel',
            message: 'Are you sure you want to delete this transaction for ' + money(delTransaction.amount) + '?',
            reject: () => null,
            confirm: async () => {
                updateMessage('Deleting transaction', 'green')
                const result = await p.deleteTransaction(transactionAccount[0], delTransaction)
                updateMessage(result.message, 'green')
            }
        })
    }

    if (
        useSelected !== 0
        && useSelected !== '0'
        && !p.hasNoTransactions.includes(useSelected)
        && !p.transactions[useSelected]
        && (!message || !message.content || (message.content && message.content !== 'Loading transactions'))
    ) loadTransactions()

    const controls = <div className='controls' style={{ 'boxShadow': 'none', border: 'none' }}>
        <Link to='/accounts' className='mr-10'>
            <IP
                type='btn_blue'
                label='Accounts'
                style={{ marginRight: '10px', 'borderRadius': '4px' }}
                icon={<FontAwesomeIcon icon={faUniversity} />}
            />
        </Link>
        {accountsCount > 0 && <IP
            type='btn'
            label='Add transaction'
            style={{ marginRight: '10px', 'borderRadius': '4px', marginTop: '13px' }}
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
            onChange={() => setTransactionDialog('add', null)}
        />}
    </div>

    return (
        <>
            <ContentBox
                className='content-box-new'
                title='Checkbook' icon={<FontAwesomeIcon icon={faMoneyCheck} />} itemId='checkbookModule'
                controls={controls}
            >
                <StyledAccountModule className='row mx'>
                    <div className={`message-container ${message ? 'message-open' : ''}`}>
                        <p className='important' style={{
                            backgroundColor: message && message.color,
                            boxShadow: `0 0 0 8px ${message && message.color ? message.color : 'red'}`
                        }}>
                            <span onClick={() => updateMessage(null)}>x</span> {message ? message.content : ''}
                        </p>
                    </div>
                    <div className='smPlus accList ml-n-15' >
                        <AccountList {...accountListProps} />
                        {p.isMobile && p.accounts.length > 1 &&
                            <div onClick={() => updateSelectingAccount(!selectingAccount)} className='choose-account-list-toggle'>
                                <p>{selectingAccount ? 'Close account list' : 'Change account (' + p.accounts.length + ')'}</p>
                            </div>
                        }
                    </div>
                    {p.accounts.length > 0 ? <div className='lg mr-n-15'>
                        <strong className='d-block' style={{ marginTop: '20px' }}>Transactions</strong>
                        <div className='search-box'>
                            <span>Search </span>
                            <input type='text' value={filter} placeholder='Search transactions' onChange={(e) => updateFilter(e.target.value)} />
                            <span className='clear-button' onClick={() => updateFilter('')}>Clear</span>
                        </div>
                        {
                            transactionData.length < 1 ?
                                <p className='center no-content'>
                                    No transactions for account {transactionAccount.length > 0 && transactionAccount[0].name}
                                </p> :
                                [...transactionData].map((tr, i) =>
                                    <Transaction
                                        key={i}
                                        tr={tr}
                                        filter={filter}
                                        handleDelete={handleDelete}
                                        setTransactionDialog={setTransactionDialog}
                                        transactionAccount={transactionAccount}
                                    />
                                )
                        }
                        {!(p.hasNoTransactions.includes(useSelected)) &&
                            <div className='center mt-40 mb-40'>
                                <button
                                    onClick={() => loadTransactions()}
                                    className='btn green'
                                >
                                    Load more transactions
                                </button>
                            </div>
                        }
                    </div> :
                        <div className='lg mr-n-15'>
                            <p className='center no-content'>
                                No accounts created
                        </p>
                        </div>
                    }
                </StyledAccountModule>
            </ContentBox>
            { showTransactionDialog.show &&
                <TransactionDialog
                    setTransactionDialog={setTransactionDialog}
                    mode={showTransactionDialog.mode}
                    submitDialogForm={submitDialogForm}
                    accountData={transactionAccount[0]}
                    budget={p.budget}
                    transaction={showTransactionDialog.transaction}
                />
            }
        </>
    )
}

export default Checkbook
