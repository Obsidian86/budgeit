import React, { useState, useContext, useEffect } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import MainContext from '../providers/MainContext';
import Collapseable from './interface/Collapseable';
import ContentBox from "./interface/ContentBox";
import { validForm, IP } from '../utilities/formUtilities'
import { filledArray } from './components/calendar/utilities'

const SavingsCalc = ({ step }) => {
  const p = useContext(MainContext)
  const [errors, updateErrors] = useState(null)
  const [showForm, updateShowForm] = useState(!(window.innerWidth <= 1000) || !(p.selectedAccount === null))

  useEffect(()=>{
    const shouldShowForm = !(window.innerWidth <= 1000) || !(p.selectedAccount === null)
    updateShowForm(shouldShowForm)
  }, [p.selectedAccount, updateShowForm])

  const processTables = (formDataIn) => {
    let formData = {...formDataIn}
    Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
    let newTable = {}
    let currentAmount = formData.stAmount
    formData.depAmount = formData.depAmount * (12 / formData.per)
    for (let i = 1; i < (formData.years + 1); i++) {  
      let newAge = formData.startAge + i
      let tableRow = {
        stAmount: currentAmount,
        interest: currentAmount * (formData.rate / 100),
        deposit: formData.depAmount
      }
      newTable[newAge] = tableRow
      currentAmount = currentAmount + formData.depAmount + (currentAmount * (formData.rate / 100))
    }

    newTable.startAmount = formDataIn.stAmount
    newTable.startInterest = formDataIn.rate
    newTable.deposit = formData.depAmount
    newTable.startAge = formData.startAge
    if(formDataIn.accountName) newTable.accountName = formDataIn.accountName

    let combineTables = [...p.savingsTable]
    combineTables[0] = {}
    combineTables.push({...newTable})
    p.updateSavingsTables(combineTables)
  }

  const deleteTable = index => {
    p.setDialog({
      open: true,
      header: 'Delete table', 
      message: <>Are you sure you want to delete this table? <br /> This can not be undone.</>, 
      confirm: ()=>{
        let newTables = [...p.savingsTable]
        newTables.splice(index, 1)
        if(newTables.length === 1){ newTables = []}
        p.updateSavingsTables(newTables)
        p.updateView('savingsModule')
      },
      reject: ()=>{ return null }
    })  
  }

  const submitForm = (formData) => {
    let fields = [
      { name: 'stAmount', req: true, type: 'number' },
      { name: 'startAge', req: true, type: 'number' },
      { name: 'depAmount', req: true, type: 'number' },
      { name: 'per', req: true, type: 'number' },
      { name: 'rate', req: true, type: 'number' },
      { name: 'years', req: true, type: 'number', lThan: 100 }
    ]
    const errs = validForm(fields, formData)
    updateErrors(errs)
    if (Object.keys(errs).length > 0) return errs
    processTables(formData)
    p.updateView('savingsModule')
  }

  const renderTable = (allTableData) => {
    const RowSpread = [8, 30, 22, 35];
    const labelStyles = {
      fontSize: '1.1rem',
      backgroundColor: p.theme.vBlueDark,
      color: '#fff',
      padding: '6px 10px 3px 10px',
      borderRadius: '5px 5px 0 0',
      width: '120px',
      textAlign: 'center',
      marginLeft: '5px'
    }
    const deleteStyles = {
      position: 'absolute',
      right: '-25px',
      top: '15px'
    } 

  let minAge = 99
  let maxAge = 1
  const procTable = (tableData, index) => {    
    if (Object.keys(tableData).length === 1 && tableData["0"]) return null
    let rows = Object.keys(tableData).map((t, i) => {
      if (t === 0 || t === '0' || isNaN(parseInt(t))) return null
      if(parseInt(t) < minAge) minAge = parseInt(t)
      if(parseInt(t) > maxAge) maxAge = parseInt(t)
      return (<TableRow
        pattern={RowSpread}
        key={t}
        tData={[
          t, "+ " + money(tableData[t].deposit), money(tableData[t].interest), 
          money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)]} />)
    })

    return (
      <div className={`thr`} style={{ marginBottom: "20px", position: 'relative'}}>
        <label style={labelStyles}>{
           tableData['accountName']
              ? tableData['accountName']
              : `Table ${index}`
        }</label>
        { <span 
          className='btn narrow red' 
          style={deleteStyles} 
          onClick={() => deleteTable(index)}>Delete table
        </span>}
        <TableRow pattern={RowSpread} className="headerRow" round={false} >
          <div> Age <br /> { tableData['startAge'] && tableData['startAge']} </div>
          <div> Deposit <br /> { money(tableData['deposit'] && tableData['deposit'])} </div>
          <div> Interest <br /> { tableData['startInterest'] && tableData['startInterest'] + '%'} </div>
          <div> Balance <br /> { money(tableData['startAmount'] && tableData['startAmount'])} </div>
        </TableRow>
        <Collapseable open={index === 0}> {rows} </Collapseable>
      </div>
    )}

    let curAllTotal = 0
    const procTotalsTable = (TD) => {
      const formAge = [...filledArray((maxAge - minAge) + 2)]
      minAge = minAge -1
      const allRrows = formAge.map((it, ind)=>{
        let addItems = []
        const deposit = TD.reduce((amnt, curTable, index) => {
          if( curTable['startAge'] && parseInt(curTable['startAge']) === minAge ) {
            curAllTotal = curAllTotal + parseFloat(curTable['startAmount'])
            addItems.push(parseFloat(curTable['startAmount']))
          }
          if(index > 0 && curTable[minAge]){
            curAllTotal = curAllTotal + parseFloat(curTable[minAge].deposit)
            return amnt = amnt + parseFloat(curTable[minAge].deposit)
          } else return amnt + 0
        }, 0)

        const interest = TD.reduce((amnt, curTable, index) => {
          if(index > 0 && curTable[minAge]){
            curAllTotal = curAllTotal + parseFloat(curTable[minAge].interest)
            return amnt = amnt + parseFloat(curTable[minAge].interest)
          } else return amnt + 0
        }, 0)

        const allDeposits = <>
          + {money(deposit)} <br />
          {addItems.map((additional, index) => 
            <p key={index} style={
              { 
                margin: '5px 0 0 0', 
                padding: '0 4px',
                color: '#fff',
                background: 'green',
                display: 'inline-block',
                borderRadius: '4px'
              }
            }>
              {money(additional)}
            </p>)
          }
        </>

        const row = (
          <TableRow
            pattern={RowSpread}
            key={minAge}
            tData={[
              minAge,
              allDeposits,
              money(interest), 
              money(curAllTotal)
            ]} 
          />
        )
        minAge++
        return row
      })
      return(
        <div className={`${showForm ? 'sm' : 'md'}`} style={{ marginBottom: "20px", position: 'relative'}}>
        <label style={labelStyles}>Totals</label>
        <TableRow pattern={RowSpread} className="headerRow" round={false} >
          <div> Age </div>
          <div> Deposit </div>
          <div> Interest </div>
          <div> Balance </div>
        </TableRow>
        <Collapseable open={true}> {allRrows} </Collapseable>
      </div>
      )
    }

    const allTables = allTableData.map((table, index) => index > 0 ? <React.Fragment key={index}>{procTable(table, index)}</React.Fragment> : null)
    const totalsTable = procTotalsTable(allTableData)

    return(
      <>
        {totalsTable}
        {allTables}
      </>
      )
  }
  
  return (
    <ContentBox title="Savings estimator" exClass={step === 0 && p.savingsTable.length < 1 && 'lg'} itemId='savingsModule'>
      <div className={`row mt-40`}>
        <p className='sm remark'>
          Estimate how much you'll have by retirement. <br /> 
          The breakdown of each account will display in a new table. The totals will display in the first table. 
        </p>
        <div className={showForm ? 'md' : 'sm'}>
          <div className='right md-center'><IP 
            type={`btn_${showForm ? 'red' : 'green'}_big`} 
            onChange={()=>{
              const cf = new Promise((resolve, reject)=> resolve(p.selectedAccount && p.addAccountToEstimator(null)))
              cf.then(()=>updateShowForm(!showForm))
            }} 
            label={showForm ? 'Hide form' : 'Show form'}
          /></div>
          { (showForm || p.selectedAccount) && <Form
            defaultFormData={ p.selectedAccount ? {
              ...p.selectedAccount,
              accountName: p.selectedAccount.name,
              rate: p.selectedAccount.interest,
              stAmount: p.selectedAccount.amount
            } : {
              stAmount: '',
              rate: ''
            }}
            reDefault
            render={(updateForm, formData, clearData) => (
              <>
                <IP type='text' alias='accountName' onChange={updateForm} data={formData} errors={errors} label='Account name' showPH='Account name' />
                <IP type='number' alias='stAmount' onChange={updateForm} data={formData} errors={errors} label='Starting amount' showPH='Starting amount' />
                <IP type='number' alias='depAmount' onChange={updateForm} data={formData} errors={errors} label='Amount each deposit' showPH='Amount each deposit' />
                <div className='row f-400'>
                  <div className='md-f'>
                    <IP type='number' alias='startAge' onChange={updateForm} data={formData} errors={errors} label='Starting age' showPH='Start age' />
                  </div>
                  <div className='md-f'>
                    <IP type='number' alias='years' onChange={updateForm} data={formData} errors={errors} label='For how many years?' showPH='Number of years' />
                  </div>
                </div>
                
                <div className='row f-400'>
                  <div className='md-f'>
                    <IP type='number' alias='per' onChange={updateForm} data={formData} errors={errors} 
                      label={<>Every ___ Month/s</>} showPH='12=1 year / 1=every month' />
                  </div>
                  <div className='md-f'>
                    <IP type='number' alias='rate' onChange={updateForm} data={formData} errors={errors} 
                      label={<>Percent rate</>} showPH='0%' />
                  </div>
                </div>
                <div className='grouping right mt-40'>
                  <IP type='btn_red' onChange={()=>{
                    clearData(formData)
                    p.selectedAccount && p.addAccountToEstimator(null)
                    }} label='Cancel' />
                  <IP type='btn' onChange={()=>{
                    submitForm(formData);
                    p.selectedAccount && p.addAccountToEstimator(null)
                    }} />
                </div>
              </>
            )}
          />}
        </div>
          {p.savingsTable.length > 1 ? renderTable(p.savingsTable)
            : <h2 className="sm" style={{ textAlign: 'center', marginTop: '75px' }}>Add savings info to calculate</h2>
          }
      </div>
    </ContentBox>
  );
};

export default SavingsCalc;
