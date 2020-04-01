import React from 'react'
import Form from '../interface/Form'
import { recurrence } from '../../utilities/constants'
import { parsedCurrentDate, stepDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities'

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem, updateEditItem, setDialog, errors, updateView }) => {
  return (<Form
    defaultFormData={
      editItem ? { 
        ...editItem, 
        newCategory: 'off', 
        noEnd: editItem.end ? "off" : "on", 
        end: editItem.end ? editItem.end : stepDate(parsedCurrentDate(new Date()).split("-"), "yearly", 10).join('-')} : 
      { 
        newCategory: 'off',
        date: parsedCurrentDate(new Date()),
        end: stepDate(parsedCurrentDate(new Date()).split("-"), "yearly", 10).join('-'), rec: 'm'
      }
    }
    reDefault
    render={(updateField, formData, clearData) => {
      return (
        <>
          <label>Category</label>
          {formData.newCategory === 'on' ? 
            <IP type='text' alias='category' onChange={e => updateField(e)} data={formData} errors={errors} /> 
            : <IP type='drop' options={catOptions} 
            data={formData} style={{styles:'width: 92%; margin: 20px auto; padding: 12px 10px'}} alias='category' 
            onChange={val => updateField({ target:{ value: val, name: 'category' } })} /> }

          <label className='cu_checkBox'>
            <input
              type='checkbox' name='newCategory'
              onChange={() => updateField({
                target: { 
                  name: 'newCategory', 
                  value: (!formData.newCategory || formData.newCategory === 'off') ? 'on' : 'off' } }) 
                }
            />{' '}
            <span />New Category
          </label>
 
          <IP type='text' alias='item' label="Budget Item" onChange={e => updateField(e)} data={formData} errors={errors} />
          <IP type='number' alias='amount' label="Amount" onChange={e => updateField(e)} data={formData} errors={errors} />

          <IP type='drop' options={recurrence} label='Recurrence'
            data={formData} style={{styles: 'width: 92%; margin: 20px auto; padding: 12px 10px'}} alias='rec' 
            onChange={val => updateField({ target:{ value: val, name: 'rec' } })} /> 
          
          <IP type='date' alias='date' label='Start date' errors={errors} data={formData}  
            onChange = {date => updateField({ target: { value: parsedCurrentDate(date), name: 'date' }})} />
          
          {(!formData.noEnd || !(formData.noEnd && formData.noEnd === 'on')) && <IP type='date' alias='end' label='End date' errors={errors} data={formData} 
            onChange={date => updateField({ target: { value: parsedCurrentDate(date), name: 'end' }})} /> }

          <label className='cu_checkBox'>
            <input
              type='checkbox' name='noEnd'
              checked={!!formData.noEnd && formData.noEnd === "on"}
              onChange={() => updateField({ 
                target: { name: 'noEnd', 
                value: (!formData.noEnd || formData.noEnd === 'off') ? 'on' : 'off'} }) }
            />{' '} <span />No end
          </label>
          <label className='cu_checkBox'>
            <input
              type='checkbox' name='isTransfer'
              checked={!!formData.isTransfer && formData.isTransfer === "on"}
              onChange={() => updateField({ 
                target: { name: 'isTransfer', 
                value: (!formData.isTransfer || formData.isTransfer === 'off') ? 'on' : 'off'} }) }
            />{' '} <span />Mark as transfer
          </label>

          <div className='grouping right mt-10' style={{maxWidth: '100%', flexWrap: 'wrap'}}>
            {editItem && <button
              onClick={() => setDialog({
                open: true,
                header: 'Delete item',
                message: <>Are you sure you want to delete this item? <br /> This can not be undone.</>,
                confirm: () => {
                  updateEditItem(null)
                  deleteBudgetItem(formData.category, formData.id)
                  updateView('yourBudgetModule')
                },
                reject: () => { return null }
              })}
              className='btn red mt-10'
            >Delete
            </button>}
            <button 
            className='btn blue mt-10'
            onClick={()=> {
              clearData()
              updateEditItem(null)
            }}>
              {editItem ? 'Cancel' : 'Clear'}
            </button>
            <button
              type='submit'
              className='btn mt-10'
              onClick={() => onSubmit(formData)}
            > Submit </button>
          </div>
        </>
      )
    }}
  />)}

export default BudgetForm
