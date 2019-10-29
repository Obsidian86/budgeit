import React from "react";
import Form from "../Form";
import DropDown from '../interface/DropDown';
import { recurrence } from '../../utilities/constants';
import FieldError from '../interface/FieldError';

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem, updateEditItem, setDialog, errors }) => 
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
            {errors && errors['item'] && <FieldError error={errors['item']} />}
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              onChange={e => updateField(e)}
              value={formData && formData.amount ? formData.amount : ""}
            />
            {errors && errors['amount'] && <FieldError error={errors['amount']} />}
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
                onClick={() => setDialog({
                  open: true,
                  header: 'Delete item', 
                  message: <>Are you sure you want to delete this item? <br /> This can not be undone.</>, 
                  confirm: ()=>{
                    updateEditItem(null)
                    deleteBudgetItem(formData.category, formData.id)
                  },
                  reject: ()=>{ return null }
                })}
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