import React from 'react'
import { money, calcMoney } from '../../utilities/convert'
import Bullet from '../interface/Bullet'
import AccountListItem from './AcountListItem'
import { validForm } from '../../utilities/formUtilities'

export const proccessAccounts = (
    s, showReturns, p, updateEdittingItem, updateShowForm, transfers = [], handleEditTransfers, parentWidth, showOptionsParent, updateShowOptions
) => {

    let total = 0
    let liquid = 0
    let creditDebt = 0
    let nonLiquid = 0
    const accountList = p.accounts.map((a, i) => {
        if(a.accountType && a.accountType === 'Credit') {
            creditDebt = calcMoney(creditDebt, a.amount)
            total = calcMoney(total, a.amount, 'subtract')
        } else {
            total = calcMoney(total, a.amount)
            if(a.liquid) liquid = calcMoney(liquid, a.amount)
            else nonLiquid = calcMoney(nonLiquid, a.amount)
        }

        return (    
            <AccountListItem
                handleEditTransfers={handleEditTransfers}
                accounts={p.accounts}
                key={i} 
                s={s} 
                a={a} 
                Bullet={Bullet}
                money={money}
                showReturns={showReturns}
                updateEdittingItem={updateEdittingItem} 
                updateShowForm={updateShowForm}
                addAccountToEstimator = {p.addAccountToEstimator}
                updateView = {p.updateView}
                transfers={transfers}
                parentWidth={parentWidth}
                showOptionsParent={showOptionsParent}
                updateShowOptions={updateShowOptions}
                budget={p.budget}
                sources={p.incomeSources}
            />
        )
    })
    return { total, liquid, accountList, creditDebt, nonLiquid }
}

export const handleSubmit = (inAccount, edittingItem, p, updateEdittingItem, updateShowForm, updateErrors) => {
    let account = { ...inAccount }
    account.interest = parseFloat(account.interest)
    account.amount = parseFloat(account.amount)
    if (account.accountType && account.accountType === 'Credit') {
        account.liquid = false
    }
    const fields = [
        { name: 'name', req: true, type: 'text' },
        { name: 'interest', req: true, type: 'float' },
        { name: 'amount', req: true, type: 'float' },
        { name: 'accountType', req: true }
      ]
    const errs = validForm(fields, account)

    if( Object.keys(errs).length > 0 ){
        return updateErrors(errs)
    }

    if (!account.creditLimit) account.creditLimit = 0

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