import React, { useState } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import ModuleTitle from "./interface/ModuleTitle";

const SavingsCalc = () => {
  const [list, updateList] = useState(null);
  const submitForm = formData => {

    Object.keys(formData).forEach(fi => formData[fi] = parseInt(formData[fi]) )

    let proc = [
      {
        stAmount: formData.stAmount,
        interest: formData.stAmount * (formData.rate / 100),
        deposited: (12 / formData.per) * formData.depAmount,
        endAmount:
          formData.stAmount +
          formData.stAmount * (formData.rate / 100) +
          (12 / formData.per) * formData.depAmount
      }
    ];
    for (let i = 1; i < formData.years; i++) {
      proc.push({
        stAmount: proc[i - 1].endAmount,
        interest: proc[i - 1].endAmount * (formData.rate / 100),
        deposited: (12 / formData.per) * formData.depAmount,
        endAmount:
          proc[i - 1].endAmount +
          proc[i - 1].endAmount * (formData.rate / 100) +
          (12 / formData.per) * formData.depAmount
      });
    }

    const RowSpread = [6, 25, 16, 24, 25];
    updateList(
      <div className="md">
        <TableRow pattern={RowSpread} className="headerRow">
          <div>Age</div>
          <div>Starting Amount</div>
          <div>Interest</div>
          <div>Deposited</div>
          <div>End</div>
        </TableRow>
        {proc.map((item, i) => (
          <TableRow pattern={RowSpread} key={i + formData.startAge}>
            <div>{i + formData.startAge} </div>
            <div> {money(item.stAmount)} </div>
            <div> {money(item.interest)} </div>
            <div> {money(item.deposited)} </div>
            <div>{money(item.endAmount)} </div>
          </TableRow>
        ))}
      </div>
    );
  };
  return (
    <div className={`contentBox`}>
      <ModuleTitle title="Savings estimator" />
      <div className={`row`}>
        <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className={list ? "sm" : "lg"}>
          <Form
            defaultFormData={{
              stAmount: 20000,
              depAmount: 25000,
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
        {list && list}
      </div>


    </div>
  );
};

export default SavingsCalc;
