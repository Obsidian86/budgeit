import React from 'react'

const IncomeFormLiveList = ({ formData, convert }) => <><li>
  <strong>Weekly:{' '}</strong>
  <span>{convert(
    formData.amount,
    formData.rec,
    'w',
    'money'
  )}
  </span>
</li>
  <li>
    <strong>Bi-Weekly:{' '}</strong>
    <span>{convert(
      formData.amount,
      formData.rec,
      'bw',
      'money'
    )}
    </span>
  </li>
  <li>
    <strong>Monthly:{' '}</strong>
    <span>{convert(
      formData.amount,
      formData.rec,
      'm',
      'money'
    )}
    </span>
  </li>
  <li>
    <strong>Yearly:{' '}</strong>
    <span>{convert(
      formData.amount,
      formData.rec,
      'y',
      'money'
    )}
    </span>
  </li></>

export default IncomeFormLiveList