import React from 'react'

const FieldError = ({ error }) =>
  <span style={{
    color: 'red',
    fontStyle: 'italic',
    marginTop: '-8px',
    display: 'block',
    textAlign: 'right',
    width: '97%'
  }}
  >
    {error}
  </span>

export default FieldError
