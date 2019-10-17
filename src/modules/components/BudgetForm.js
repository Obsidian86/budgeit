import React from "react";
import Form from "../Form";
import DropDown from '../interface/DropDown';
import { recurrence } from '../../utilities/constants'

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem, updateEditItem }) => 
    <Form
      defaultFormData={editItem ? { ...editItem, newCategory: 'off' } : { newCategory: 'off' }}
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
                isSet={formData.category ? formData.category : ""}
                callBack={val => updateField({target:{value: val, name: "category"}}) }
              />}
            <label className='cu_checkBox'>
              <input
                type="checkbox"
                name="newCategory"
                onChange={() => updateField({ 
                  target: {
                      name: 'newCategory',
                      value: (formData['newCategory'] === 'off') ? 'on' : 'off'
                    }
                  }) 
                }
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
              options={recurrence}
              styles={`width: 91%; margin: 20px auto`}
              isSet={"m"}
              callBack={val => {
                let e = {};
                e.target = { value: val, name: "initialRec" };
                updateField(e);
              }}
            />
            <div className="grouping right">
              <button
                onClick={() => {
                  updateEditItem(null)
                  deleteBudgetItem(formData.category, formData.id)}
                }
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

export default BudgetForm