import React, { useContext } from "react";
import Form from "./Form";
import DropDown from "./interface/DropDown";
import MainContext from "../providers/MainContext";
import { convert } from "../utilities/convert";
import SoftList from "./interface/SoftList";
import { recurrence } from '../utilities/constants'
import ContentBox from "./interface/ContentBox";

const IncomeForm = () => {
  const p = useContext(MainContext);
  const { updateAmount, theme } = p; 

  const submitForm = data => updateAmount(data);

  return (
    <ContentBox title='Takehome amount' exClass='sm' exStyles={{borderTop: `8px solid ${theme.green}`}}>
      <br />
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
                placeholder="input amount to begin"
                onChange={e => updateField(e)}
              />
              <span
                style={{color: 'red', fontStyle: 'italic', marginTop: '-8px', display: 'block', textAlign: 'right', width: '97%'}}
              >Please enter an amount</span>
              <label htmlFor="initialRec">Recurrence</label>
              <DropDown
                options={recurrence}
                styles={`width: 89%; margin: 20px auto`}
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
            {(formData.initialAmount && parseFloat(formData.initialAmount) > 0) ?
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
              </SoftList> : ''
            }
          </div>
        )}
      />
    </ContentBox>
  );
};

export default IncomeForm;
