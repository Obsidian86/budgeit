import React, { useState, useEffect } from 'react'

/**
* @param defaultFormData // default form information
* @param reDefault // will reset fields to default on submit
**/

const Form = ({ render, defaultFormData = {}, reDefault = false }) => {
  const [formData, updateFormData] = useState(defaultFormData)
  const [formLoaded, updateFormLoaded] = useState(false)
  useEffect(() => {
    !formLoaded && updateFormData(defaultFormData)
    !reDefault && updateFormLoaded(true)
  }, [defaultFormData, formLoaded, reDefault])
  const clearData = () => {
    updateFormData({...defaultFormData || {}})
  }
  const updateField = e =>
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  return <>{render(updateField, formData, clearData)}</>
}

export default Form
