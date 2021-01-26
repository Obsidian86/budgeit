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
import { faTimes, faMoneyBillWave, faPlus, faBackspace } from "@fortawesome/free-solid-svg-icons";

const IncomeForm = () => {
  const p = useContext(MainContext)
  const { addSource, updateSource, deleteSource, setDialog } = p
  const [edittingItem, updateEdditingItem] = useState(null)
  const [errors, updateErrors] = useState(null)
  const [openedForm, updateOpenedform] = useState(false)

  const submitForm = (inData, editting) => {
    let data = { ...inData }
    const errs = {}
    data.date = parsedCurrentDate(data.date)
    if (!data.item) errs.item = 'Please input an item name'
    if (data.autoOn && data.autoOn === 'on') {
      if (!data.toAccount) errs.autoOn = "Account required for auto deposit"
      if (!data.toAccount) errs.toAccount = "Account required for auto deposit"
    } else {
      data.toAccount = ''
    }
    if (!data.amount) {
      errs.amount = 'Please input an amount'
    } else {
      if (isNaN(data.amount.split(' ').join(''))) errs.amount = 'Please input a number'
    }
    updateErrors(errs)
    if (Object.keys(errs).length < 1) {
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

  const handClickEditItem = item => {
    updateEdditingItem({ ...item, autoOn: item.toAccount !== '' ? 'on' : 'off' })
  }

  const hasSource = p.incomeSources.length > 0
  const defaultFormData = edittingItem ?
    { ...edittingItem } :
    { rec: 'w', date: new Date() }

  const showForm = !hasSource || (openedForm || !p.isMobile || edittingItem)
  const hideContent = p.isMobile && showForm

  const controls = hideContent ?
    <button
      className='btn red'
      onClick={() => { updateOpenedform(false); handleCancelClick(); }}
    >
      <FontAwesomeIcon icon={faBackspace} /> &nbsp;
      Back
    </button> 
      : showForm ? '' : 
        <button
          className='btn'
          onClick={() => updateOpenedform(true)}>
          <FontAwesomeIcon icon={faPlus}
        /> &nbsp;
          Add source
        </button>

  return (
    <ContentBox
      title='Income sources'
      exClass='new-content-box mx row'
      itemId='default'
      icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
      controls={controls}
    >
      {showForm && <div className={`mt-10 m-sm new-form`}>
        <h4 className='section-title'>{
          edittingItem ? 'Edit income source' : 'Add income source'
        }</h4>
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
                      type='btn_red_mb-10'
                      label={`Delete ${formData.item || ''}`}
                      icon={<FontAwesomeIcon icon={faTimes} />}
                    />
                  </div>
                }
                <IP type='text' showPH='Source name' alias='item' label='Source name' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP showPH='Amount' type='number' alias='amount' label='Take home pay' onChange={e => updateField(e)} data={formData} errors={errors} />
                <IP type='drop' alias='rec' style={{ styles: 'width:92%; margin: 20px auto; padding: 12px 10px;' }} options={recurrence} label='Recurrence' onChange={val => {
                  updateField({ target: { value: val, name: 'rec' } })
                }} data={formData} errors={errors} />
                <IP type='date' alias="date" label='Start date' data={formData}
                  onChange={val => updateField({ target: { value: parsedCurrentDate(val), name: 'date' } })} />
              </>

              <label className='cu_checkBox'>
                <input
                  type='checkbox' name='autoOn'
                  checked={!!formData.autoOn && formData.autoOn === "on"}
                  disabled={p.accounts.length < 1}
                  onChange={() => updateField({
                    target: {
                      name: 'autoOn',
                      value: (!formData.autoOn || formData.autoOn === 'off') ? 'on' : 'off'
                    }
                  })}
                />{' '} <span />Auto deposit
              </label>
              {
                p.accounts.length < 1 && <p className='pl-10'>Account needed for auto deposit</p>
              }
              {(formData.autoOn && formData.autoOn !== 'off') ?
                p.accounts.length > 0 &&
                  <IP type='drop'
                    errors={errors}
                    options={p.accounts
                      .filter(a => a.accountType !== 'Credit')
                      .map(acc => ({ d: acc.name + ' - ' + money(acc.amount), v: acc.id }))
                    }
                    label='To account'
                    data={formData}
                    style={{ styles: 'width: 92%; margin: 20px auto; padding: 12px 10px' }}
                    alias='toAccount'
                    onChange={val => updateField({ target: { value: val, name: 'toAccount' } })}
                  /> : null}

              <span className='grouping right mt-10'>
                <IP type='btn_blue' onChange={() => { handleCancelClick(); clearData(); }} label={(edittingItem || p.isMobile) ? "Cancel" : "Clear"} />
                <IP type='btn_white' onChange={() => submitForm(formData, !!edittingItem)} />
              </span>
              <br />
              <Fade time={120}>
                {(formData.amount && parseFloat(formData.amount) && parseFloat(formData.amount) > 0) ?
                  <SoftList split color="rgb(225, 252, 225)" radius='5px'>
                    <IncomeFormLiveList formData={formData} convert={convert} />
                  </SoftList> : <></>
                }
              </Fade>
            </div>
          )}
        />
      </div>}
      {!hideContent && <>
        {hasSource ?
          <div className='m-lg mt-40'>
            <h4 className='section-title'>Current income sources</h4>
            <TableRow className="headerRow"
              tData={['Name', 'Recurrence', 'Amount']}
            />
            {p.incomeSources.map((s, i) =>
              <TableRow tData={[s.item, disRec(s.rec), money(s.amount)]} key={i} onClick={() => handClickEditItem(s)} />
            )}
          </div>
          : <div className='m-lg'><div className='center-all'><h2>Add Income source</h2></div></div>
        }
      </>}
    </ContentBox>
  )
}

export default IncomeForm
