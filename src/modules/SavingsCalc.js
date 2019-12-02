import React, { useState, useContext } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import MainContext from '../providers/MainContext';
import Collapseable from './interface/Collapseable';
import ContentBox from "./interface/ContentBox";
import FieldError from './interface/FieldError';
import { validForm } from '../utilities/formUtilities'

const SavingsCalc = ({ step }) => {
  const p = useContext(MainContext)
  const [errors, updateErrors] = useState(null) 

  const processTables = (formDataIn) => {
    let formData = {...formDataIn}
    Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
    let totals = { ...p.savingsTable[0] }
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
      if (totals[newAge]) {
        totals[newAge].stAmount = totals[newAge].stAmount + currentAmount;
        totals[newAge].interest = totals[newAge].interest + (currentAmount * (formData.rate / 100));
        totals[newAge].deposit = totals[newAge].deposit + formData.depAmount;
      } else totals[newAge] ={...tableRow}
      currentAmount = currentAmount + formData.depAmount + (currentAmount * (formData.rate / 100))
    }
    let combineTables = [...p.savingsTable]
    combineTables[0] = {...totals}
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
        const deletedTable = newTables[index]
        Object.keys(deletedTable).forEach(it => {
          const {stAmount, interest, deposit} = deletedTable[it]
          if(newTables[0][it]){
            newTables[0][it].stAmount = newTables[0][it].stAmount - stAmount
            newTables[0][it].interest = newTables[0][it].interest - interest
            newTables[0][it].deposit = newTables[0][it].deposit - deposit
            if(newTables[0][it].stAmount + newTables[0][it].interest + newTables[0][it].deposit === 0) delete newTables[0][it]
          }
        })
        newTables.splice(index, 1)
        if(newTables.length === 1){ newTables = []}
        p.updateSavingsTables(newTables)
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
  }

  const renderTable = (tableData, index) => {
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
    if (Object.keys(tableData).length === 1 && tableData["0"]) return null 

    let rows = Object.keys(tableData).map(t => {
      if (t === 0 || t === '0') return null
      return (<TableRow
        pattern={RowSpread}
        key={t}
        tData={[
          t, "+ " + money(tableData[t].deposit), money(tableData[t].interest), 
          money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)]} />)
    })

    return (
      <div className="sm" style={{ marginBottom: "20px", position: 'relative' }}>
        <label style={labelStyles}>{index === 0 ? 'Totals' : `Table ${index}`}</label>
        {index !== 0 &&  <span className='btn narrow red' style={deleteStyles} onClick={() => deleteTable(index)}>Delete table</span> }
        <TableRow
          pattern={RowSpread}
          className="headerRow"
          tData={["Age", "Deposited", "Interest", "End"]}
        />
        <Collapseable open={index === 0}>
          {rows}
        </Collapseable>
      </div>
    )
  }
  return (
    <ContentBox title="Savings estimator" exClass={step === 0 && p.savingsTable.length < 1 && 'lg'} itemId='savingsModule'>
      <div className={`row mt-40`}>
        <p className='sm'>
          Estimate how much you'll have by retirement. <br /> 
          The breakdown of each account will display in a new table. The totals will display in the first table. 
        </p>
        <div className={step === 0 && p.savingsTable.length < 1 ? 'lg' : 'md'}>
          <Form
            render={(updateForm, formData) => (
              <>
                <label>Starting amount</label>
                <input type="number" onChange={updateForm} name="stAmount" value={formData.stAmount || ''} />
                {errors && errors['stAmount'] && <FieldError error={errors['stAmount']} />}

                <label>Amount each deposit</label>
                <input type="number" onChange={updateForm} name="depAmount" value={formData.depAmount || ''} />
                {errors && errors['depAmount'] && <FieldError error={errors['depAmount']} />}

                <div className='row f-400'>
                  <div className='md-f'>
                    <label>Starting age</label>
                    <input type="number" onChange={updateForm} name="startAge" value={formData.startAge || ''} />
                    {errors && errors['stAge'] && <FieldError error={errors['stAge']} />}
                  </div>
                  <div className='md-f'>
                    <label>For how many years?</label>
                    <input type="number" onChange={updateForm} name="years" value={formData.years || ''} />
                    {errors && errors['years'] && <FieldError error={errors['years']} />}
                  </div>
                </div>
                
                <div className='row f-400'>
                  <div className='md-f'>
                    <label>
                        Every ___ Month/s 
                        <span>(12 = 1 year)</span>
                    </label>
                    <input type="number" onChange={updateForm} name="per" value={formData.per || ''} />
                    {errors && errors['per'] && <FieldError error={errors['per']} />}
                  </div>
                  <div className='md-f'>
                    <label>Percent rate <span>(number only)</span></label>
                    <input type="number" onChange={updateForm} name="rate" value={formData.rate || ''} />
                    {errors && errors['rate'] && <FieldError error={errors['rate']} />}
                  </div>
                </div>
                <div className='grouping right'>
                  <button className="btn" onClick={() => submitForm(formData)}>
                    Submit
                  </button>
                </div>
              </>
            )}
          />
        </div>
          {p.savingsTable.length > 1 || step === 0 ?
            p.savingsTable.map((t, index) => <React.Fragment key={index}> {renderTable(t, index)} </React.Fragment>)
            : <h2 className="sm" style={{ textAlign: 'center', marginTop: '75px' }}>Add savings info to calculate</h2>
          }
      </div>
    </ContentBox>
  );
};

export default SavingsCalc;
