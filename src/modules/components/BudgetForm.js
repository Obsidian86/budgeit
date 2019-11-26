import React from 'react'
import Form from '../Form'
import DropDown from '../interface/DropDown'
import { recurrence } from '../../utilities/constants'
import FieldError from '../interface/FieldError'
import DatePicker from 'react-date-picker';
import { parsedCurrentDate, stepDate } from '../components/calendar/dateFunctions'

const IP = ({type='text', alias, onChange, data, errors, label }) => {
  return(<>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={alias}
        onChange={e => onChange(e)}
        value={data && data[alias] ? data[alias] : ''}
      />
      {errors && errors[alias] && <FieldError error={errors[alias]} />}
    </>)
}

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem, updateEditItem, setDialog, errors }) =>
  <Form
    defaultFormData={
      editItem ? { ...editItem, newCategory: 'off' } : 
      { 
        newCategory: 'off',
        date: parsedCurrentDate(new Date()),
        end: stepDate(parsedCurrentDate(new Date()).split("-"), "yearly", 10).join('-')
      }
    }
    reDefault
    render={(updateField, formData) => {
      return (
        <>
          <label>Category </label>
          {formData.newCategory === 'on' ? 
            <IP type='text' alias='category' onChange={e => updateField(e)} data={formData} errors={errors} /> 
            : <DropDown
              options={catOptions}
              styles='width: 89%; margin: 20px auto'
              isSet={formData.category ? formData.category : ''}
              callBack={val => updateField({ target:{ value: val, name: 'category' } })}
            />}
          <label className='cu_checkBox'>
            <input
              type='checkbox'
              name='newCategory'
              onChange={() => updateField({
                target: {
                  name: 'newCategory',
                  value: (formData.newCategory === 'off') ? 'on' : 'off'
                }
              })
              }
            />{' '}
            <span />New Category
          </label>
 
          <IP type='text' alias='item' label="Budget Item" onChange={e => updateField(e)} data={formData} errors={errors} />
          <IP type='number' alias='amount' label="Amount" onChange={e => updateField(e)} data={formData} errors={errors} />

          <label>Recurrence</label>
          <DropDown
            options={recurrence}
            styles='width: 91%; margin: 20px auto'
            isSet='m'
            callBack={val => updateField({target: { value: val, name: 'initialRec' }} )}
          />
          
            <label>Start date {formData && formData.date}</label>
          {/* <span>
            <DatePicker
              value = {new Date(formData.date)}
              onChange = {date => updateField({ target: { value: parsedCurrentDate(date), name: 'date' }})}
            />
          </span> */}
          
          <label>End date {formData && formData.end}</label>
          {/* <span>
            <DatePicker
              value = { new Date(formData.end) }
              onChange = {date => updateField({ target: { value: parsedCurrentDate(date), name: 'end' }})}
            />
          </span> */}
          {errors && errors.end && <FieldError error={errors.end} />}


          <div className='grouping right mt-40'>
            <button
              onClick={() => setDialog({
                open: true,
                header: 'Delete item',
                message: <>Are you sure you want to delete this item? <br /> This can not be undone.</>,
                confirm: () => {
                  updateEditItem(null)
                  deleteBudgetItem(formData.category, formData.id)
                },
                reject: () => { return null }
              })}
              className='btn red'
            >Delete
            </button>
            <button
              type='submit'
              className='btn'
              onClick={() => onSubmit(formData)}
            > Submit </button>
          </div>
        </>
      )
    }}
  />

export default BudgetForm
