import React, { useContext } from "react";
import Form from "./Form";
import DropDown from "./interface/DropDown";
import MainContext from "../providers/MainContext";
import { convert } from "../utilities/convert";
import SoftList from "./interface/SoftList";
import { recurrence } from '../utilities/constants'

const IncomeForm = () => {
  const p = useContext(MainContext);
  const { updateAmount, theme } = p; 

  const submitForm = data => updateAmount(data);

  return (
    <div
      className="contentBox sm"
      style={{ borderTop: `8px solid ${theme.green}`, paddingTop: "0" }}
    >
      <h2>Take home amount</h2>
      <Form
        defaultFormData={{ initialAmount: p.amount, initialRec: "w" }}
        render={(updateField, formData) => (
          <div className="initial-form">
            <>
              <label htmlFor="initialAmount">Enter Amount</label>
              <input
                type="text"
                name="initialAmount"
                id="initialAmount"
                value={formData.initialAmount ? formData.initialAmount : ""}
                placeholder="asdas"
                onChange={e => updateField(e)}
              />
              <label htmlFor="initialRec">Recurrence</label>
              <DropDown
                options={recurrence}
                styles={`width: 91%; margin: 20px auto`}
                isSet={formData.initialRec ? formData.initialRec : ""}
                callBack={val => {
                  let e = {};
                  e.target = { value: val, name: "initialRec" };
                  updateField(e);
                }}
              />
            </>
            <span className="grouping right">
              <button className="btn" onClick={() => submitForm(formData)}>
                Submit
              </button>
            </span>
            {formData.initialAmount && (
              <SoftList split>
                <li>
                  <strong>Weekly:{" "}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    "w",
                    "money"
                  )}
                  </span>
                </li>
                <li>
                  <strong>Bi-Weekly:{" "}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    "bw",
                    "money"
                  )}</span>
                </li>
                <li>
                  <strong>Monthly:{" "}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    "m",
                    "money"
                  )}</span>
                </li>
                <li>
                  <strong>Yearly:{" "}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    "y",
                    "money"
                  )}</span>
                </li>
              </SoftList>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default IncomeForm;
