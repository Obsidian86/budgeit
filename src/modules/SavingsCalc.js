import React, { useState, useContext } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import ModuleTitle from "./interface/ModuleTitle";
import MainContext from '../providers/MainContext' 

const SavingsCalc = () => {
  const p = useContext(MainContext)
  const [tables, updateTables] = useState([
      { 0: { stAmount: 0, interest: 0, deposit: 0 } }
    ]);
  const submitForm = (formData) => {
    Object.keys(formData).forEach(fd => formData[fd] = parseFloat(formData[fd]))
    let totals = {...tables[0]}
    let newTable = {}
    let currentAmount = formData.stAmount
    for(let i=1; i<(formData.years + 1); i++){
      let newAge = formData.startAge + i
      let tableRow = {
        stAmount: currentAmount,
        interest: currentAmount * (formData.rate / 100),
        deposit: formData.depAmount
      }
      newTable[newAge] = tableRow
      if(totals[newAge]){
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

  const renderTable = tableData => {
    const RowSpread = [6, 25, 16, 24, 25];
    let rows = Object.keys(tableData).map(t => <TableRow pattern={RowSpread} key={t}>
        <div>{t} </div>
        <div> {money(tableData[t].stAmount)} </div>
        <div> {money(tableData[t].interest)} </div>
        <div> {money(tableData[t].deposit)} </div>
        <div>{money(tableData[t].stAmount + tableData[t].interest + tableData[t].deposit)} </div>
      </TableRow> )
    return (
      <div className="md">
        <TableRow pattern={RowSpread} className="headerRow">
          <div>Age</div>
          <div>Starting Amount</div>
          <div>Interest</div>
          <div>Deposited</div>
          <div>End</div>
        </TableRow>
        {rows}
      </div>
    )
  } 
  return (
    <div className={`contentBox`}>
      <ModuleTitle title="Savings estimator" />
      <div className={`row`}>
        <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className={true ? "sm" : "lg"}>
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
                <input type="text" onChange={updateForm} name="startAge" value={formData.startAge}/>

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
        {tables.map(t => renderTable(t))}
      </div>


    </div>
  );
};

export default SavingsCalc;
