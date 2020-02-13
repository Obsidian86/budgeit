import React, { useState, useContext, useEffect } from 'react'
import { IP } from '../../utilities/formUtilities'
import { makeCall } from '../../api/apiCall'
import ContentBox from "../interface/ContentBox"
import MainContext from '../../providers/MainContext'
import s from './styles'
import { submitForm } from './functions'

const LoginScreen = () => {

    const p = useContext(MainContext)

    const [formType, updateFormType] = useState('login')
    const [formData, updateFormData] = useState({})
    const [formErrors, updateFormErrors] = useState({})
    const [formState, updateFormState] = useState('static')

    useEffect(() => {
        window.addEventListener('keydown', enterPress)
        return(() => window.removeEventListener('keydown', enterPress))
    })

    const handleChange = event => updateFormData({ ...formData, [event.target.id]: event.target.value }) 
    const enterPress = event => event.keyCode && event.keyCode === 13 && handleSubmit()
    const handleSubmit = () => submitForm(formData, formType, updateFormErrors, updateFormState, p.setUser, makeCall, p.setDialog)

    return(
        <ContentBox title='Login' itemId='loginModule' hideShrink>
        <div className='row mt-40'>
          { formErrors['message'] && <p>{formErrors['message']}</p> }
            <IP
                alias={'username'}
                onChange={handleChange}
                data={formData}
                errors={formErrors}
                label='username'
                showPH="Username"
            />
            <IP 
                type={'password'}
                alias={'password'}
                onChange={handleChange}
                data={formData}
                errors={formErrors}
                label='password'
                showPH="*******"
            />
            {formType === 'register' && <IP 
                type={'password'}
                alias={'rePassword'}
                onChange={handleChange}
                data={formData}
                errors={formErrors}
                label='re-enter password'
                showPH="*******"
            />}
            <span className='grouping right mt-10' style={s.btnContainer}>
                <p onClick={()=> updateFormType(formType === 'login' ? 'register' : 'login')} style={s.link}>
                  {formType === 'login' ? 'No account? Create account' : 'Have an account? Log in' }
                </p>
                <IP 
                    type='btn'
                    style={{backgroundColor: formState === 'loading' ? 'blue': null}} 
                    onChange={formState === 'static' ? handleSubmit : null} 
                    label={formState==='loading' ? 'Loading...' : 'Log in'} 
                />
            </span>
        </div>
        </ContentBox>
      )
  }

export default LoginScreen