import React, { useContext, useState } from 'react'
import Form from './Form'
import DropDown from './interface/DropDown'
import MainContext from '../providers/MainContext'
import { convert } from '../utilities/convert'
import SoftList from './interface/SoftList'
import { recurrence } from '../utilities/constants'
import ContentBox from './interface/ContentBox'
import FieldError from './interface/FieldError'
import { Fade } from './Transitions'

const IncomeForm = () => {
  const p = useContext(MainContext)
  const { updateAmount, theme } = p
  const [errors, updateErrors] = useState(null)

  const submitForm = data => {
    const errs = {}

    if (!data.initialAmount) {
      errs.initialAmount = 'Please input an amount'
    } else {
      const test = data.initialAmount.split(' ').join('')
      if (isNaN(test)) errs.initialAmount = 'Please input a number'
    }

    updateErrors(errs)
    if (Object.keys(errs).length < 1) return updateAmount(data)
  }

  return (
    <ContentBox title='Takehome amount' exClass='sm' exStyles={{ borderTop: `8px solid ${theme.green}` }}>
      <br />
      <Form
        defaultFormData={{ initialAmount: p.amount, initialRec: 'w' }}
        render={(updateField, formData) => (
          <div className='initial-form'>
            <>
              <label htmlFor='initialAmount'>Enter Amount</label>
              <input
                type='number'
                name='initialAmount'
                id='initialAmount'
                value={formData.initialAmount ? formData.initialAmount : ''}
                placeholder='input amount to begin'
                onChange={e => updateField(e)}
              />
              {errors && errors.initialAmount && <FieldError error={errors.initialAmount} />}
              <label htmlFor='initialRec'>Recurrence</label>
              <DropDown
                options={recurrence}
                styles='width: 89%; margin: 20px auto'
                isSet={formData.initialRec ? formData.initialRec : ''}
                callBack={val => {
                  const e = {}
                  e.target = { value: val, name: 'initialRec' }
                  updateField(e)
                }}
              />
            </>
            <span className='grouping right'>
              <button className='btn' onClick={() => submitForm(formData)}>
                Submit
              </button>
            </span>
            <Fade time={120}>
              {(formData.initialAmount && parseFloat(formData.initialAmount) > 0) &&
              <SoftList split>
                <li>
                  <strong>Weekly:{' '}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    'w',
                    'money'
                  )}
                  </span>
                </li>
                <li>
                  <strong>Bi-Weekly:{' '}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    'bw',
                    'money'
                  )}
                  </span>
                </li>
                <li>
                  <strong>Monthly:{' '}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    'm',
                    'money'
                  )}
                  </span>
                </li>
                <li>
                  <strong>Yearly:{' '}</strong>
                  <span>{convert(
                    formData.initialAmount,
                    formData.initialRec,
                    'y',
                    'money'
                  )}
                  </span>
                </li>
              </SoftList>
              }
            </Fade>
          </div>
        )}
      />
    </ContentBox>
  )
}

export default IncomeForm
