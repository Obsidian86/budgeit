import React from 'react'
import FieldError from '../modules/interface/FieldError'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import DropDown from '../modules/interface/DropDown'
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

export const IP = ({type='text', alias, onChange, data, errors, label, options = [], style= {}, showPH = null, icon }) => {
    let exClass = ""
    let classes = type.split("_")
    if(classes.length > 1) {
        type = classes[0]
        exClass = classes.splice(1, (classes.length - 1)).join(" ") 
    }
    return(<>
        {label && (type !=='checkbox' && !type.includes('btn')) && <label htmlFor={`${alias}`}>{label}</label>}
  
        {(type ==='text' || type ==='number' || type === 'password') && 
        <input
          type={type}
          name={alias}
          id={label ? alias : null}
          style={style}
          className={exClass}
          placeholder={showPH ? showPH : null}
          onChange={e => onChange(e)}
          value={data && (data[alias] || data[alias] === 0 || data[alias] === '0') ? data[alias] : ''}
        />}
  
        {type === 'drop' && 
        <DropDown
            options={options}
            styles={style.styles ? style.styles : ''}
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
            className={exClass}
            selected = {data && data[alias] && pDate(data[alias])}
            onChange = {date => onChange(date)}  />
        </span>}
  
        {type === 'btn' &&
            <button onClick={onChange} className={`btn ${exClass}`} style={style}>
                { icon && <i style={{
                    paddingRight: '10px',
                    borderRight: '1px solid white',
                    marginRight: '10px'
                }}>{icon}</i>}
                {label ? label : 'Submit'}
            </button>
        }

        {errors && errors[alias] && <FieldError error={errors[alias]} />}
  
      </>)
  }