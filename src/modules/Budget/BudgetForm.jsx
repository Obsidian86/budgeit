import React from 'react'
import Form from '../interface/Form'
import { recurrence } from '../../utilities/constants'
import { parsedCurrentDate, stepDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities'
import { money } from '../../utilities/convert'

const BudgetForm = ({ editItem, onSubmit, catOptions, deleteBudgetItem, updateEditItem, setDialog, errors, updateView, accountList, retainData = {}, linkedTransfer }) => {
  const accountOptions = accountList.map(acc => ({d: acc.name + ' - ' + money(acc.amount), v: acc.id}))
  const hasTransfer = linkedTransfer && linkedTransfer.length > 0 
  return (<Form
    defaultFormData={
      editItem ? { 
        ...editItem, 
        newCategory: 'off', 
        noEnd: editItem.end ? "off" : "on", 
        end: editItem.end ? editItem.end : stepDate(parsedCurrentDate(new Date()).split("-"), "yearly", 10).join('-'),
        autoOn: editItem.fromAccount && editItem.fromAccount !== '' ? 'on' : 'off',
        isTransfer: editItem.isTransfer,
        createTransfer: hasTransfer ? 'on' : 'off',
        transferFromAccount: hasTransfer ? linkedTransfer[0]['fromAccount'] : null,
        transferToAccount: hasTransfer ? linkedTransfer[0]['toAccount'] : null,
        ...retainData
      } : 
      { 
        newCategory: 'off',
        date: parsedCurrentDate(new Date()),
        end: stepDate(parsedCurrentDate(new Date()).split("-"), "yearly", 10).join('-'), rec: 'm',
        autoOn: 'off',
        ...retainData
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
          
         { !(!!formData.autoOn && formData.autoOn === 'on') &&
          <label className='cu_checkBox'>
            <input
              type='checkbox' name='isTransfer'
              checked={!!formData.isTransfer && formData.isTransfer === "on"}
              onChange={() => updateField({ 
                target: { name: 'isTransfer', 
                value: (!formData.isTransfer || formData.isTransfer === 'off') ? 'on' : 'off'} }) }
            />{' '} 
            <span />
            Retain funds
            <p className='muted' style={{width: '100%', margin: '8px 0 0 45px', color: '#c9c9c9'}}>
              Doesn't subtract from totals.
            </p>
          </label>}

          {/* AUTO CREATE ACCOUNT TRANSFER */}
          { !!formData.isTransfer && formData.isTransfer === "on" &&
          <label className='cu_checkBox'>
            <input
              type='checkbox' name='createTransfer'
              checked={!!formData.createTransfer && formData.createTransfer === "on"}
              onChange={() => updateField({ 
                target: { name: 'createTransfer', 
                value: (!formData.createTransfer || formData.createTransfer === 'off') ? 'on' : 'off'} }) }
            />{' '} 
            <span />
            Create account transfer
          </label>}

          {
            !!formData.createTransfer && formData.createTransfer === 'on' && !!formData.isTransfer && formData.isTransfer === "on" && <>
              <IP type='drop' 
                options={
                  formData.transferToAccount ? [...accountOptions].filter(i => i.v + '' !== formData.transferToAccount + '') : accountOptions} 
                label='Transfer from'
                data={formData} 
                style={{styles: 'width: 92%; margin: 20px auto; padding: 12px 10px'}} 
                alias='transferFromAccount' 
                onChange={val => updateField({ target:{ value: val, name: 'transferFromAccount' } })}
                errors={errors}  
              />
              <IP type='drop' 
                options={formData.transferFromAccount ? [...accountOptions].filter(i => i.v + '' !== formData.transferFromAccount + '') : accountOptions} 
                label='Transfer to'
                data={formData} 
                style={{styles: 'width: 92%; margin: 20px auto; padding: 12px 10px'}} 
                alias='transferToAccount' 
                onChange={val => updateField({ target:{ value: val, name: 'transferToAccount' } })}
                errors={errors}  
              />
            </>
          }
          
          {/* ---- END -- AUTO CREATE ACCOUNT TRANSFER */}

          { !(!!formData.isTransfer && formData.isTransfer === 'on') &&
            <label className='cu_checkBox'>
              <input
                type='checkbox' name='autoOn'
                checked={!!formData.autoOn && formData.autoOn === "on"}
                onChange={() => updateField({ 
                  target: { name: 'autoOn', 
                  value: (!formData.autoOn || formData.autoOn === 'off') ? 'on' : 'off'} }) }
              />{' '} <span />Auto widthdrawl
            </label>
          }

          {formData.autoOn && formData.autoOn === 'on' && !(!!formData.isTransfer && formData.isTransfer === 'on') &&
            <IP type='drop' options={accountOptions} label='From account'
              data={formData} style={{styles: 'width: 92%; margin: 20px auto; padding: 12px 10px'}} alias='fromAccount' 
              onChange={val => updateField({ target:{ value: val, name: 'fromAccount' } })} 
            /> }

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
