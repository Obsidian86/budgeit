import React from 'react'
import FieldError from '../modules/interface/FieldError'
import DatePicker from 'react-datepicker';
import DropDown from '../modules/interface/DropDown'
import "react-datepicker/dist/react-datepicker.css"
import { pDate } from '../modules/components/calendar/dateFunctions'

export const validForm = (fieldList, dataCheck) => {
    let errs = {}
    for(const fItem in fieldList){
        const f = fieldList[fItem]

        // make sure field exists
        if ( dataCheck[f.name] !== '0' && dataCheck[f.name] !== 0 && (f.req && !dataCheck[f.name])) errs[f.name] = 'Field is required'

        // Make sure is number
        if (dataCheck[f.name] && f.type === 'number') {
            let test = isNaN(dataCheck[f.name]) ? dataCheck[f.name].replace(" ", "") : dataCheck[f.name]
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

export const IP = ({type='text', alias, onChange, data, errors, label, options = [], style= {}, showPH = null }) => {
    let exClass = ""
    let classes = type.split("_")
    if(classes.length > 1) exClass = classes.splice(1, (classes.length - 1)).join(" ") 
    return(<>
        {label && (type !=='checkbox') && <label htmlFor={`${alias}`}>{label}</label>}
  
        {(type ==='text' || type ==='number') && 
        <input
          type={type}
          name={alias}
          id={label ? alias : null}
          style={style}
          className={exClass}
          placeholder={showPH ? showPH : null}
          onChange={e => onChange(e)}
          value={data && data[alias] ? data[alias] : ''}
        />}
  
        {type === 'drop' && 
        <DropDown
            options={options}
            style={style}
            className={exClass}
            isSet={data && data[alias] ? data[alias] : ''}
            callBack={val => onChange(val)}
        />}
  
        {type === 'checkbox' && 
            <label className='cu_checkBox' style={style}>
                <input 
                    type='checkbox'
                    className='cu_checkBox'
                    checked={data && data[alias] ? data[alias] : false}
                    onChange={e => onChange(e)}
                />
                <span />{label && label}
            </label>
        }

        {type === 'date' && 
        <span>
            <DatePicker
            selected = {data && data[alias] && pDate(data[alias])}
            onChange = {date => onChange(date)}  />
        </span>}
  
        {type === 'btn' &&
            <button onClick={onChange} className={`btn ${exClass}`}>
                {label ? label : 'Submit'}
            </button>
        }

        {errors && errors[alias] && <FieldError error={errors[alias]} />}
  
      </>)
  }