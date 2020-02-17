import React, { useContext, useState } from 'react'
import Form from './interface/Form'
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
  const { addSource, updateSource, deleteSource, setDialog } = p
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
      p.updateView('default')
      return editting ? updateSource(data) : addSource(data)
    }
  }
  const hasSource = p.incomeSources.length > 0
  const defaultFormData = edittingItem ? 
      { ...edittingItem } :
      { rec: 'w', date: new Date() }
  
  return (
    <ContentBox title='Income sources' exClass={hasSource ? 'mx row' : 'sm'} itemId='default'>
      <br />
      <div className={`mt-40 ${hasSource ? 'sm' : null}`}>
        <Form
          reDefault
          defaultFormData={defaultFormData}
          updateEdditingItem={updateEdditingItem}
          render={(updateField, formData, clearData) => (
            <div className='initial-form'>
              <>
              {edittingItem && <button className='btn red mt-40 mb-10' onClick={() => setDialog({
                  header: 'Delete source', open: true, reject: () => null,
                  message: `Are you sure you want to delete source ${formData.item}`,
                  confirm: () => {
                    deleteSource(formData.id); 
                    updateEdditingItem(null)
                    p.updateView('default')
                  }
                })}>Delete</button>}
                <IP type='text' showPH='Source name' alias='item' label='Source name' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP showPH='Amount' type='number' alias='amount' label='Take home pay' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP type='drop' alias='rec' style={{styles: 'width:92%; margin: 20px auto; padding: 12px 10px;'}} options={recurrence} label='Recurrence' onChange={val => {
                  updateField({ target: { value: val, name: 'rec' } }) }} data={formData} errors={errors} />
                <IP type='date' alias="date" label='Start date' data={formData} 
                  onChange={val => updateField({ target: { value: parsedCurrentDate(val), name: 'date' } }) } />
              </>
              <span className='grouping right'>
                <IP type='btn_blue' onChange={() => {updateEdditingItem(null); clearData()} } label={edittingItem ? "Cancel" : "Clear"} />
                <IP type='btn' onChange={() =>submitForm(formData, !!edittingItem)} />
              </span>
              <Fade time={120}>
                {(formData.amount && parseFloat(formData.amount) && parseFloat(formData.amount) > 0) ?
                  <SoftList split>
                    <IncomeFormLiveList formData={formData} convert={convert} />
                  </SoftList> : <></>
                }
              </Fade>
            </div>
          )}
        />
      </div>
      {hasSource &&
        <div className='lg mt-40'>
          <TableRow className="headerRow" 
            tData={['Name', 'Recurrence', 'Amount']}
          />
          {p.incomeSources.map((s, i) =>
            <TableRow tData={[s.item, disRec(s.rec), money(s.amount)]} key={i} onClick={() => updateEdditingItem(s)} />
          )}
        </div>
      }
    </ContentBox>
  )
}

export default IncomeForm
