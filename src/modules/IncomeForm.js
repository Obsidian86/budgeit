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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMoneyBillWave, faPlus } from "@fortawesome/free-solid-svg-icons";

const IncomeForm = () => {
  const p = useContext(MainContext)
  const { addSource, updateSource, deleteSource, setDialog } = p
  const [edittingItem, updateEdditingItem] = useState(null)
  const [errors, updateErrors] = useState(null)
  const [openedForm, updateOpenedform] = useState(false)

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
      openedForm && updateOpenedform(false)
      return editting ? updateSource(data) : addSource(data)
    }
  }

  const handleCancelClick = () => {
    updateEdditingItem(null)
    openedForm && updateOpenedform(false)
  }

  const setDeleteSource = formData => setDialog({
      header: 'Delete source', open: true, reject: () => null,
      message: `Are you sure you want to delete source ${formData.item}`,
      confirm: () => {
        deleteSource(formData.id); 
        updateEdditingItem(null)
        p.updateView('default')
      }
  })

  const hasSource = p.incomeSources.length > 0
  const defaultFormData = edittingItem ? 
      { ...edittingItem } :
      { rec: 'w', date: new Date() }

  const showForm = !hasSource || (openedForm || !p.isMobile || edittingItem)

  return (
    <ContentBox title='Income sources' exClass='mx row' itemId='default' icon={<FontAwesomeIcon icon={faMoneyBillWave} />}>
      <div className='c-pad'>
        <div className='grouping right mt-40'>
          {!showForm && 
            <button
              className='btn'
              onClick={()=>updateOpenedform(true)}>
              <FontAwesomeIcon icon={faPlus} /> &nbsp;
              Add source
            </button>}
        </div>
        {showForm && <div className={`mt-40 m-sm`} style={{paddingTop: '30px'}}>
        <Form
          reDefault
          defaultFormData={defaultFormData}
          updateEdditingItem={updateEdditingItem}
          render={(updateField, formData, clearData) => (
            <div className='initial-form'>
              <>
                {edittingItem && 
                  <div className='grouping left'>
                    <IP 
                      onChange={setDeleteSource.bind(null, formData)} 
                      type='btn_red_narrow_mb-10' 
                      label={`Delete ${formData.item || ''}`} 
                      icon={<FontAwesomeIcon icon={faTimes} />} 
                    />
                  </div>
                }
                <IP type='text' showPH='Source name' alias='item' label='Source name' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP showPH='Amount' type='number' alias='amount' label='Take home pay' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP type='drop' alias='rec' style={{styles: 'width:92%; margin: 20px auto; padding: 12px 10px;'}} options={recurrence} label='Recurrence' onChange={val => {
                  updateField({ target: { value: val, name: 'rec' } }) }} data={formData} errors={errors} />
                <IP type='date' alias="date" label='Start date' data={formData} 
                  onChange={val => updateField({ target: { value: parsedCurrentDate(val), name: 'date' } }) } />
              </>

            <label className='cu_checkBox'>
              <input
                type='checkbox' name='isTransfer'
                checked={!!formData.isTransfer && formData.isTransfer === "on"}
                onChange={() => updateField({ 
                  target: { name: 'isTransfer', 
                  value: (!formData.isTransfer || formData.isTransfer === 'off') ? 'on' : 'off'} }) }
              />{' '} <span />Auto deposit
            </label>

            {(formData.isTransfer && formData.isTransfer !== 'off') ?
              p.accounts.length < 1 ? <p>Acc needed</p> :
              <IP type='drop' options={p.accounts.map(acc => ({d: acc.name + ' - ' + money(acc.amount), v: acc.id}))} label='To account'
                data={formData} style={{styles: 'width: 92%; margin: 20px auto; padding: 12px 10px'}} alias='toAccount' 
                onChange={val => updateField({ target:{ value: val, name: 'toAccount' } })} 
              /> : null }

              <span className='grouping right'>
                <IP type='btn_blue' onChange={()=> { handleCancelClick(); clearData(); }} label={(edittingItem || p.isMobile) ? "Cancel" : "Clear"} />
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
      </div>}
      {hasSource ?
        <div className='m-lg mt-40'>
          <TableRow className="headerRow" 
            tData={['Name', 'Recurrence', 'Amount']}
          />
          {p.incomeSources.map((s, i) =>
            <TableRow tData={[s.item, disRec(s.rec), money(s.amount)]} key={i} onClick={() => updateEdditingItem(s)} />
          )}
        </div>
        : <div className='m-lg'><div className='center-all'><h2>Add Income source</h2></div></div>
      }
      </div>
    </ContentBox>
  )
}

export default IncomeForm
