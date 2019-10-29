import React, { useState, useContext } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import MainContext from '../providers/MainContext';
import Collapseable from './interface/Collapseable';
import ContentBox from "./interface/ContentBox";
import FieldError from './interface/FieldError';

const SavingsCalc = ({ step }) => {
  const p = useContext(MainContext)
  const [errors, updateErrors] = useState(null)
  
  const processTables = (formData) => {
    Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
    let totals = { ...p.savingsTable[0] }
    let newTable = {}
    let currentAmount = formData.stAmount
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
      } else totals[newAge] = tableRow
      currentAmount = currentAmount + formData.depAmount + (currentAmount * (formData.rate / 100))
    }
    let combineTables = [...p.savingsTable]
    combineTables[0] = totals
    combineTables.push(newTable)
    p.updateSavingsTables(combineTables)
  }

  const submitForm = (formData) => {
    let errs = {}
    let fields = [
      { name: 'stAmount', req: true, type: 'number' },
      { name: 'startAge', req: true, type: 'number' },
      { name: 'depAmount', req: true, type: 'number' },
      { name: 'per', req: true, type: 'number' },
      { name: 'rate', req: true, type: 'number' },
      { name: 'years', req: true, type: 'number' }
    ]
    fields.forEach(f => {
      if (f.req && !formData[f.name]) errs[f.name] = 'Field is required'
      if (f.type === 'number') {
        let test = formData[f.name].split(" ").join('')
        if (isNaN(test)) errs[f.name] = 'Please input a number'
      }
    })

    updateErrors(errs)
    if (Object.keys(errs).length > 0) return errs
    processTables(formData)
  }

  const renderTable = (tableData, index) => {
    const RowSpread = [6, 25, 16, 24, 25];
    if (Object.keys(tableData).length === 1 && tableData["0"]) {
      return null
    }
    let rows = Object.keys(tableData).map(t => {
      if (t === 0 || t === '0') return null
      return (<TableRow
        pattern={RowSpread}
        key={t}
        tData={[
          t, money(tableData[t].stAmount), money(tableData[t].interest), money(tableData[t].deposit),
          money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)]} />)
    })

    return (
      <div className="md" style={{ marginBottom: "20px" }}>
        <label style={{
          fontSize: '1.1rem',
          backgroundColor: p.theme.vBlueDark,
          color: '#fff',
          padding: '6px 10px 3px 10px',
          borderRadius: '5px 5px 0 0',
          width: '120px',
          textAlign: 'center',
          marginLeft: '30px'
        }}>{index === 0 ? 'Totals' : `Table ${index}`}</label>
        <TableRow
          pattern={RowSpread}
          className="headerRow"
          tData={["Age", "Starting Amount", "Interest", "Deposited", "End"]}
        />
        <Collapseable open={index === 0}>
          {rows}
        </Collapseable>
      </div>
    )
  }
  return (
    <ContentBox title="Savings estimator" exClass={step === 0 && 'lg'}>
      <div className={`row`}>
        <p className='sm'>Estimate how much you'll have by retirement. <br /> The breakdown of each account will display in a new table. The totals will display in the first table. </p>
        <div className={step === 0 ? 'lg' : 'sm'}>
          <Form
            defaultFormData={{
              stAmount: 20000,
              depAmount: 20000,
              per: 12,
              rate: 7,
              years: 36,
              startAge: 33
            }}
            render={(updateForm, formData) => (
              <>
                <label>Starting amount</label>
                <input type="text" onChange={updateForm} name="stAmount" value={formData.stAmount} />
                {errors && errors['stAmount'] && <FieldError error={errors['stAmount']} />}

                <label>Starting age</label>
                <input type="text" onChange={updateForm} name="startAge" value={formData.startAge} />
                {errors && errors['stAge'] && <FieldError error={errors['stAge']} />}

                <label>Amount each deposit</label>
                <input type="text" onChange={updateForm} name="depAmount" value={formData.depAmount} />
                {errors && errors['depAmount'] && <FieldError error={errors['depAmount']} />}

                <label>Ever __ Month (12 = 1 year)</label>
                <input type="text" onChange={updateForm} name="per" value={formData.per} />
                {errors && errors['per'] && <FieldError error={errors['per']} />}

                <label>Percent rate (number only)</label>
                <input type="text" onChange={updateForm} name="rate" value={formData.rate} />
                {errors && errors['rate'] && <FieldError error={errors['rate']} />}

                <label>For how many years?</label>
                <input type="text" onChange={updateForm} name="years" value={formData.years} />
                {errors && errors['years'] && <FieldError error={errors['years']} />}

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
          : <h2 className="md" style={{ textAlign: 'center', marginTop: '75px' }}>Add a budget item</h2>
        }
      </div>
    </ContentBox>
  );
};

export default SavingsCalc;
