import React, { useState } from "react";
import Form from "./Form";
import { money } from "../utilities/convert";
import TableRow from "./interface/TableRow";
import ModuleTitle from "./interface/ModuleTitle";

const SavingsCalc = () => {
  const [list, updateList] = useState(null);
  const submitForm = formData => {
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
      <div className="lg">
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
    <div className={`contentBox ${list && "row"}`}>
      <ModuleTitle title="Savings estimator" />
      <div className={list ? "sm" : "max"}>
        <Form
          defaultFormData={{
            stAmount: 20000,
            depAmount: 80000,
            per: 12,
            rate: 7,
            years: 36,
            startAge: 33
          }}
          render={(updateForm, formData) => (
            <>
              <label>Starting amount</label>
              <input type="text" onChange={updateForm} name="stAmount" />

              <label>Age</label>
              <input type="text" onChange={updateForm} name="startAge" />

              <label>Deposit</label>
              <input type="text" onChange={updateForm} name="depAmount" />

              <label>Per</label>
              <input type="text" onChange={updateForm} name="per" />

              <label>Rate</label>
              <input type="text" onChange={updateForm} name="rate" />

              <label>Years</label>
              <input type="text" onChange={updateForm} name="years" />

              <button className="btn" onClick={() => submitForm(formData)}>
                Submit
              </button>
            </>
          )}
        />
      </div>
      {list && list}
    </div>
  );
};

export default SavingsCalc;
