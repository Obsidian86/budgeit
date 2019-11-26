import React from 'react'
import FieldError from '../modules/interface/FieldError'
import DatePicker from 'react-date-picker';
import DropDown from '../modules/interface/DropDown'

export const validForm = (fieldList, dataCheck) => {
    let errs = {}
    for(const fItem in fieldList){
        const f = fieldList[fItem]
        if (f.req && !dataCheck[f.name]) errs[f.name] = 'Field is required'
        if ( dataCheck[f.name] && f.type === 'number' && isNaN(dataCheck[f.name])) {
            let test = dataCheck[f.name].split(" ").join('')
            if (isNaN(test)) errs[f.name] = 'Please input a number'
        }
    }
    return errs
}

export const IP = ({type='text', alias, onChange, data, errors, label, options = [], styles= '', showPH = false }) => {
    return(<>
        {label && <label>{label}</label>}
  
        {(type ==='text' || type ==='number') && 
        <input
          type={type}
          name={alias}
          styles={styles}
          placeholder={showPH && label ? `Input ${label}` : null}
          onChange={e => onChange(e)}
          value={data && data[alias] ? data[alias] : ''}
        />}
  
        {type === 'drop' && 
        <DropDown
            options={options}
            styles={styles}
            isSet={data && data[alias] ? data[alias] : ''}
            callBack={val => onChange(val)}
        />}
  
        {type === 'date' && 
        <span>
            <DatePicker
            value = {data && data[alias] && new Date(data[alias])}
            onChange = {date => onChange(date)}  />
        </span>}
  
        {errors && errors[alias] && <FieldError error={errors[alias]} />}
  
      </>)
  }