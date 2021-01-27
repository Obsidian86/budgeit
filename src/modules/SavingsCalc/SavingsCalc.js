import React, { useState, useContext, useEffect } from "react";
import Form from "../interface/Form";
import { money } from "../../utilities/convert";
import TableRow from "../interface/TableRow";
import MainContext from '../../providers/MainContext';
import Collapseable from '../interface/Collapseable';
import ContentBox from "../interface/ContentBox";
import { validForm, IP } from '../../utilities/formUtilities'
import { filledArray } from '../components/calendar/utilities'
import { styles } from './styles'
import * as SCF from './savingsCalcFunctions'
import { getAge } from '../components/calendar/dateFunctions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import ProcTable from './ProcTable'


const SavingsCalc = () => {
  const p = useContext(MainContext)
  const [errors, updateErrors] = useState(null)
  const [showForm, updateShowForm] = useState(!(window.innerWidth <= 1000) || !(p.selectedAccount === null))
  const [excludedTables, updateExcludedTables] = useState([])

  useEffect(()=>{
    const shouldShowForm = !(window.innerWidth <= 1000) || !(p.selectedAccount === null)
    updateShowForm(shouldShowForm)
  }, [p.selectedAccount, updateShowForm])

  const s = styles(p.theme)
  const deleteTable = tableId => SCF.deleteTable(tableId, p.setDialog, p.deleteSavingsTables, p.updateView)
  const RowSpread = [8, 30, 22, 35];
  const toggleExclusions = (index) => {
    if(excludedTables.includes(index)){
      const excl = [...excludedTables].filter(item => item !== index)
      return updateExcludedTables(excl)
    }
    return updateExcludedTables([...excludedTables, index])
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
    p.addSavingsTables(formData)
    p.updateView('savingsModule')
  }

  const renderTable = (allTableData) => {

    const allAges = [...new Set(allTableData
      .reduce((p, c) => {
      return [...p, ...Object.keys(c)
        .filter(k => parseInt(k) ? true: false )]
    }, []))]
    .map(age => parseInt(age))
    .sort()
  
    let minAge = allAges[0]
    let maxAge = allAges[allAges.length - 1]

    let curAllTotal = 0
    const procTotalsTable = (TD) => {
      const formAge = [...filledArray((maxAge - minAge) + 2)]
      minAge = minAge -1
      const allRrows = formAge.map((it, ind)=>{
        let addItems = []
        const deposit = TD.reduce((amnt, curTable, index) => {
          if( curTable['startAge'] && parseInt(curTable['startAge']) === minAge && !excludedTables.includes(index)) {
            curAllTotal = curAllTotal + parseFloat(curTable['startAmount'])
            addItems.push(parseFloat(curTable['startAmount']))
          }
          if(index > 0 && curTable[minAge] && !excludedTables.includes(index)){
            curAllTotal = curAllTotal + parseFloat(curTable[minAge].deposit)
            return amnt = amnt + parseFloat(curTable[minAge].deposit)
          } else return amnt + 0
        }, 0)

        const interest = TD.reduce((amnt, curTable, index) => {
          if(index > 0 && curTable[minAge] && !excludedTables.includes(index)){
            curAllTotal = curAllTotal + parseFloat(curTable[minAge].interest)
            return amnt = amnt + parseFloat(curTable[minAge].interest)
          } else return amnt + 0
        }, 0)

        const allDeposits = 
        <>
          <span style={{color: 'darkblue'}}>{money(deposit)}</span> <br />
          {addItems.map((additional, index) => <p key={index} style={s.tablePill}> {money(additional)} </p>) }
        </>

        const row = (
          <TableRow
            pattern={RowSpread}
            key={minAge}
            tData={[
              minAge,
              allDeposits,
              money(interest), 
              <span style={{color: 'darkgreen'}}>{money(curAllTotal)}</span>
            ]} 
          />
        )
        minAge++
        return row
      })
      return(
        <div className={`max`} style={s.tableContainer}>
          <label style={s.labelStyles}>Totals</label>
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

    const allTables = allTableData.map((table, index) => index > 0
      ? <>
        <div style={s.controlsContainer}>
            <label style={s.labelStyles}>{table['accountName'] ? table['accountName'] : `Table ${index}`}</label>
            <span style={s.buttonsContainer}>
                <span
                    className='btn narrow blue'
                    style={s.toggleStyles}
                    onClick={() => toggleExclusions(index)}> {excludedTables.includes(index) ? "Show" : "Hide"} in totals
                </span>
                <span
                    className='btn narrow red'
                    style={s.deleteStyles}
                    onClick={() => deleteTable(table.id)}> Delete
                </span>
            </span>
        </div>
        <ProcTable
          tableData={table}
          index={index}
          s={s}
          key={'table-' + index}
          toggleExclusions={toggleExclusions}
          tableHidden={excludedTables.includes(index)}
          deleteTable={deleteTable}
          RowSpread={RowSpread}
        />
      </>
      : null)
    const totalsTable = procTotalsTable(allTableData)

    return(
      <>
        {totalsTable}
        {allTables}
      </>
      )
  }

  const startAge = p.userInfo && p.userInfo.dob && p.userInfo.dob !== '' ? getAge(p.userInfo.dob) : null
  const years = startAge ? 62 - startAge : null
  const formOpen = showForm || p.selectedAccount
  const controls = <IP 
      type={`btn_${showForm ? 'red' : 'green'}`} 
      onChange={()=>{
        const cf = new Promise(resolve => resolve(p.selectedAccount && p.addAccountToEstimator(null)))
        cf.then(()=>updateShowForm(!showForm))
      }}
      icon={showForm ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
      label={showForm ? 'Hide form' : 'Show form'}
    />
  return (
    <ContentBox 
      title="Savings estimator" 
      itemId='savingsModule' 
      controls={controls} 
      icon={<FontAwesomeIcon icon={faPiggyBank} />} 
      exClass={'mx row new-content-box'}
    >
       {formOpen && <div className='mt-10 m-sm new-form'>
          <h4 className='section-title'> New savings estimate </h4>
          <Form
            defaultFormData={ p.selectedAccount ? {
              ...p.selectedAccount,
              accountName: p.selectedAccount.name,
              rate: p.selectedAccount.interest,
              stAmount: p.selectedAccount.amount,
              startAge,
              years
            } : {
              stAmount: '',
              rate: '',
              startAge,
              years
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
                    <IP type='number' alias='years' onChange={updateForm} data={formData} errors={errors} label='# of years?' showPH='Number of years' />
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
                  <IP type='btn_white' onChange={()=>{
                    submitForm(formData);
                    p.selectedAccount && p.addAccountToEstimator(null)
                    }} />
                </div>
              </>
            )}
          />
        </div> }
        <div className={formOpen ? 'm-lg' : 'max'}>
          <p className='max remark'>
            Estimate how much you'll have by retirement. <br /> 
            The breakdown of each account will display in a new table.
          </p>
          {p.savingsTable && p.savingsTable.length > 1 ? renderTable(p.savingsTable)
            : <h2 className="max" style={s.noTables}>Add savings info to calculate</h2>
          }
        </div>
    </ContentBox>
  );
};

export default SavingsCalc;
