import React from 'react'
import Form from '../Form'
import { recurrence } from '../../utilities/constants'
import { parsedCurrentDate, stepDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities'

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
          <label>Category</label>
          {formData.newCategory === 'on' ? 
            <IP type='text' alias='category' onChange={e => updateField(e)} data={formData} errors={errors} /> 
            : <IP type='drop' options={catOptions} 
            data={formData} styles='width: 89%; margin: 20px auto' alias='category' 
            onChange={val => updateField({ target:{ value: val, name: 'category' } })} /> }

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
 

          <IP type='drop' options={recurrence} label='Recurrence'
            data={formData} styles='width: 91%; margin: 20px auto' alias='initialRec' 
            onChange={val => updateField({ target:{ value: val, name: 'initialRec' } })} /> 
          
          <IP type='date' alias='date' label='Start date' errors={errors} data={formData}  
            onChange = {date => updateField({ target: { value: parsedCurrentDate(date), name: 'date' }})} />

          <IP type='date' alias='end' label='End date' errors={errors} data={formData} 
            onChange={date => updateField({ target: { value: parsedCurrentDate(date), name: 'end' }})} /> 

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
