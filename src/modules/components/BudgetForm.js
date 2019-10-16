import React from "react";
import Form from "../Form"; 
import DropDown from '../interface/DropDown';

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem }) => {
    const options = [
      { d: "Weekly", v: "w" },
      { d: "Bi-weekly", v: "bw" },
      { d: "Monthly", v: "m" },
      { d: "Yearly", v: "y" }
    ];
    return (
      <Form
        defaultFormData={editItem ? editItem : {newCategory: 'off'}}
        reDefault
        render={(updateField, formData) => {
          return (
            <>
              <label>Category </label>
              {formData['newCategory'] === 'on' ? <input
                type="text"
                name="category"
                onChange={e => updateField(e)}
                value={formData && formData.category ? formData.category : ""}
              /> : <DropDown
                options={catOptions}
                styles={`width: 89%; margin: 20px auto`}
                // isSet={formData.initialRec ? formData.initialRec : ""}
                callBack={val => {
                  let e = {};
                  e.target = { value: val, name: "initialRec" };
                  updateField(e);
                }}
              />}
              <label className='cu_checkBox'>
                <input
                  type="checkbox"
                  name="newCategory"
                  onChange={() => {
                    let e = {
                      target: {
                        name: 'newCategory',
                        value: (formData['newCategory'] === 'off') ? 'on' : 'off'
                      }
                    }
                    updateField(e)
                  }}
                />{" "} 
                <span></span>New Category
              </label>
  
              <label>Budget Item</label>
              <input
                type="text"
                name="item"
                onChange={e => updateField(e)}
                value={formData && formData.item ? formData.item : ""}
              />
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                onChange={e => updateField(e)}
                value={formData && formData.amount ? formData.amount : ""}
              />
              <label>Recurrence</label>
              <DropDown
                  options={options}
                  styles={`width: 91%; margin: 20px auto`}
                  isSet={formData.initialRec ? formData.initialRec : ""}
                  callBack={val => {
                    let e = {};
                    e.target = { value: val, name: "initialRec" };
                    updateField(e);
                  }}
                />
              <div className="grouping right">
                <button
                    onClick={()=> deleteBudgetItem(formData.category, formData.id)}
                    className="btn red"
                >Delete</button>
                <button
                  type="submit"
                  className="btn"
                  onClick={() => onSubmit(formData)}
                >
                  Submit
                </button>
              </div>
            </>
          );
        }}
      />
    );
  };

  export default BudgetForm