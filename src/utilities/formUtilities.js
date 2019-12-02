import React from 'react'
import FieldError from '../modules/interface/FieldError'
import DatePicker from 'react-datepicker';
import DropDown from '../modules/interface/DropDown'
import "react-datepicker/dist/react-datepicker.css"

export const validForm = (fieldList, dataCheck) => {
    let errs = {}
    for(const fItem in fieldList){
        const f = fieldList[fItem]

        // make sure field exists
        if ( dataCheck[f.name] !== '0' && dataCheck[f.name] !== 0 && (f.req && !dataCheck[f.name])) errs[f.name] = 'Field is required'

        // Make sure is number
        if (dataCheck[f.name] && f.type === 'number') {
            let test = dataCheck[f.name].split(" ").join('')
            if (isNaN(test)) { 
                errs[f.name] = 'Please input a number'
            }else{
                if(f.lThan && parseInt(dataCheck[f.name]) >= f.lThan){
                    errs[f.name] = `Number must be less than ${f.lThan}`
                }
            }
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
            selected = {data && data[alias] && new Date(data[alias])}
            onChange = {date => onChange(date)}  />
        </span>}
  
        {errors && errors[alias] && <FieldError error={errors[alias]} />}
  
      </>)
  }