import React, { useState, useContext } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import ModuleTitle from "./interface/ModuleTitle";
import MainContext from '../providers/MainContext'
import Collapseable from './interface/Collapseable'

const SavingsCalc = () => {
  const p = useContext(MainContext)
  const [tables, updateTables] = useState([
    { 0: { stAmount: 0, interest: 0, deposit: 0 } }
  ]);
  const submitForm = (formData) => {
    Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
    let totals = { ...tables[0] }
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
    let combineTables = [...tables]
    combineTables[0] = totals
    combineTables.push(newTable)
    updateTables(combineTables)
    p.updateSavingsTables(combineTables)
  }

  const renderTable = (tableData, index) => {
    const RowSpread = [6, 25, 16, 24, 25];
    if( Object.keys(tableData).length === 1 && tableData["0"] ){
      return null
    }
    let rows = Object.keys(tableData).map(t => {
      if(t === 0 || t === '0') return null
      return (<TableRow 
        pattern={RowSpread}
        key={t}
        tData={[
          t, money(tableData[t].stAmount), money(tableData[t].interest), money(tableData[t].deposit),
          money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)]}/>)
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
    <div className={`contentBox`}>
      <ModuleTitle title="Savings estimator" />
      <div className={`row`}>
        <p className='sm'>Estimate how much you'll have by retirement. <br /> The breakdown of each account will display in a new table. The totals will display in the first table. </p>
        <div className={Object.keys(tables).length > 1 ? "sm" : "lg"}>
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

                <label>Age</label>
                <input type="text" onChange={updateForm} name="startAge" value={formData.startAge} />

                <label>Deposit</label>
                <input type="text" onChange={updateForm} name="depAmount" value={formData.depAmount} />

                <label>Per</label>
                <input type="text" onChange={updateForm} name="per" value={formData.per} />

                <label>Rate</label>
                <input type="text" onChange={updateForm} name="rate" value={formData.rate} />

                <label>Years</label>
                <input type="text" onChange={updateForm} name="years" value={formData.years} />

                <div className='grouping right'>
                  <button className="btn" onClick={() => submitForm(formData)}>
                    Submit
                  </button>
                </div>
              </>
            )}
          />
        </div>
        {tables.map((t, index) => <React.Fragment key={index}> {renderTable(t, index)} </React.Fragment> )}
      </div>


    </div>
  );
};

export default SavingsCalc;
