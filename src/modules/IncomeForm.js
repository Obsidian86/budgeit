import React, { useContext, useState } from 'react'
import Form from './Form'
import MainContext from '../providers/MainContext'
import { convert, disRec, money } from '../utilities/convert'
import SoftList from './interface/SoftList'
import { recurrence } from '../utilities/constants'
import ContentBox from './interface/ContentBox'
import { Fade } from './Transitions'
import IncomeFormLiveList from './components/IncomeFormLiveList'
import { IP } from '../utilities/formUtilities'
import { parsedCurrentDate } from './components/calendar/dateFunctions'
import TableRow from './interface/TableRow'

const IncomeForm = () => {
  const p = useContext(MainContext)
  const { theme, addSource, updateSource, deleteSource, setDialog } = p
  const [edittingItem, updateEdditingItem] = useState(null)
  const [errors, updateErrors] = useState(null)

  const submitForm = (data, editting) => {
    const errs = {}
    data.date = parsedCurrentDate(data.date)
    if (!data.item) errs.item = 'Please input an item name' 
    if (!data.amount) errs.amount = 'Please input an amount'
    else { if (isNaN(data.amount.split(' ').join(''))) errs.amount = 'Please input a number' }
    updateErrors(errs)
    if (Object.keys(errs).length < 1){
      updateEdditingItem(null)
      data.category = 'Income'
      return editting ? updateSource(data) : addSource(data)
    }
  }

  const hasSource = p.incomeSources.length > 0
  return (
    <ContentBox title='Sources' exClass={hasSource ? 'mx row' : 'sm'} exStyles={{ borderTop: `8px solid ${theme.green}` }}>
      <br />
      <div className={hasSource ? 'sm' : null}>
        <Form
          reDefault
          updateEdditingItem={updateEdditingItem}
          defaultFormData={
            edittingItem ? { ...edittingItem } :
              { rec: edittingItem ? edittingItem.rec : 'w', date: new Date() }
          }
          render={(updateField, formData) => (
            <div className='initial-form'>
              <>
                <IP type='text' alias='item' label='Source name' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP type='number' alias='amount' label='Enter Amount' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP type='drop' alias='rec' styles='width: 89%; margin: 20px auto' options={recurrence} label='Recurrence' onChange={val => {
                  updateField({ target: { value: val, name: 'rec' } })
                }} data={formData} errors={errors} />
                <IP type='date' alias="date" label='Start date' data={formData} onChange={val => console.log(val)} />
              </>
              <span className='grouping right'>
                {edittingItem && <button className='btn red' onClick={() => setDialog({
                  header: 'Delete source', open: true, reject: () => null,
                  message: `Are you sure you want to delete source ${formData.item}`,
                  confirm: () => {deleteSource(formData.id); updateEdditingItem(null)}
                })}>Delete</button>}
                <button className='btn blue' onClick={() => updateEdditingItem(null)} >{edittingItem ? "Cancel" : "Clear"}</button>
                <button className='btn' onClick={() => submitForm(formData, !!edittingItem)}> Submit </button>
              </span>
              <Fade time={120}>
                {(formData.amount && parseFloat(formData.amount) > 0) &&
                  <SoftList split>
                    <IncomeFormLiveList formData={formData} convert={convert} />
                  </SoftList>
                }
              </Fade>
            </div>
          )}
        />
      </div>

      {hasSource &&
        <div className='lg'>
          {p.incomeSources.map((s, i) =>
            <TableRow tData={[s.item, disRec(s.rec), money(s.amount)]} key={i} onClick={() => updateEdditingItem(s)} />
          )}
        </div>
      }
    </ContentBox>
  )
}

export default IncomeForm
