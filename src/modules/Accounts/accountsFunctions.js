import React from 'react'
import { money, calcMoney } from '../../utilities/convert'
import Bullet from '../interface/Bullet'
import { getInterest } from '../../utilities/functions'
import AccountListItem from '../components/AcountListItem'
import { validForm } from '../../utilities/formUtilities'

export const proccessAccounts = (s, showReturns, p, updateEdittingItem, updateShowForm, transfers = [], handleEditTransfers) => {
    let total = 0
    let liquid = 0
    const accountList = p.accounts.map((a, i) => {
        total = calcMoney(total, a.amount)
        if(a.liquid) liquid = calcMoney(liquid, a.amount)
        const interest = getInterest(parseFloat(a.amount), parseFloat(a.interest), 10)
        return (    
            <AccountListItem
                handleEditTransfers={handleEditTransfers}
                accounts={p.accounts}
                key={i} 
                s={s} 
                a={a} 
                Bullet={Bullet}
                money={money} interest={interest} 
                showReturns={showReturns}
                updateEdittingItem={updateEdittingItem} 
                updateShowForm={updateShowForm}
                addAccountToEstimator = {p.addAccountToEstimator}
                updateView = {p.updateView}
                transfers={transfers}
            />
        )
    })
    return { total, liquid, accountList}
}

export const handleSubmit = (account, edittingItem, p, updateEdittingItem, updateShowForm, updateErrors) => {
    account.interest = parseFloat(account.interest)
    account.amount = parseFloat(account.amount)
    const fields = [
        { name: 'name', req: true, type: 'text' },
        { name: 'interest', req: true, type: 'float' },
        { name: 'amount', req: true, type: 'float' }
      ]
    const errs = validForm(fields, account)
    if( Object.keys(errs).length > 0 ){
        return updateErrors(errs)
    }
    if(edittingItem){
        p.updateAccount(account)
        updateEdittingItem(false)
    } else {
        p.addAccount(account)
    }
    updateShowForm(false)
    updateErrors({})
    p.updateView('accountsModule')
}

export const deleteAccount = (accountId, clearData, p, updateEdittingItem, updateShowForm, updateErrors) => {
    p.setDialog({
      open: true,
      header: 'Delete account', 
      message: <>Are you sure you want to delete this account? <br /> This can not be undone.</>, 
      confirm: ()=>{
        p.deleteAccount(accountId)
        updateEdittingItem(null)
        updateShowForm(false)
        updateErrors({})
        clearData()
        p.updateView('accountsModule')
      },
      reject: ()=>{ return null }
    })  
  }