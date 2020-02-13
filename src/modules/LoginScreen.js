import React, { useState, useContext } from 'react'
import { IP } from '../utilities/formUtilities'
import { makeCall } from '../api/apiCall'
import ContentBox from "./interface/ContentBox"
import MainContext from '../providers/MainContext'

const LoginScreen = () => {

    const p = useContext(MainContext)

    const [formType, updateFormType] = useState('login')
    const [formData, updateFormData] = useState({})
    const [formErrors, updateFormErrors] = useState({})
    const [formState, updateFormState] = useState('static')


    const handleChange = (event) => updateFormData({ ...formData, [event.target.id]: event.target.value }) 

    const submitForm = async () => {
      //test22 tUser123
      let errors = {}

      if(!formData['username'] || formData['username'].replace(/ /g, '') === ''){
        errors['username'] = 'Username required'
        if(formData['username'].length <= 4) errors['username'] = 'Username must be longer than 4 characters'
      }
      if(!formData['password'] || formData['password'].replace(/ /g, '') === ''){
        errors['password'] = 'password required'
        if(formData['password'].length <= 4) errors['password'] = 'Password must be longer than 4 characters'
        if(formType === 'register'){
          if(!formData['rePassword']) errors['rePassword'] = 'password required' 
          if(formData['rePassword'] !== formData['password']) errors['rePassword'] = 'passwords do not match' 
        }
      }
      if( Object.keys(errors).length > 0) return updateFormData(errors)
      else{
        const username = formData['username']
        const password = formData['password']
        // make call to log in
        const body = { username, password }
        if(formType === 'register') body['rePassword'] = formData['rePassword'] 
        const loginData = {
          endPoint: formType === 'login' ? 'token' : 'createUser',
          body,
          method: 'POST'
        }
        const loginResponse = await makeCall(loginData)
        if(loginResponse.access && loginResponse.refresh){
          updateFormErrors(errors)
          updateFormState('static')
          localStorage.setItem('aKey', JSON.stringify([loginResponse.access, loginResponse.refresh, Date.now()]))
          p.setUser(username)
        } else if (loginResponse.detail && loginResponse.detail === "No active account found with the given credentials"){
          errors['message'] = 'Incorrect username or password'
          updateFormErrors(errors)
          updateFormState('static')
        } else {
          errors['message'] = 'Failed to log in'
          updateFormErrors(errors)
          updateFormState('static')
        }
      }
    }

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
            <span className='grouping right mt-10'>
                <p onClick={()=>updateFormType(formType === 'login' ? 'register' : 'login')}>
                  {formType === 'login' ?
                    'No account? Create account' : 'Have an account? Log in'
                  }
                </p>
                <IP 
                    type='btn'
                    style={{backgroundColor: formState === 'loading' ? 'blue': null}} 
                    onChange={formState === 'static' ? submitForm : null} 
                    label={formState==='loading' ? 'Loading...' : 'Log in'} 
                />
            </span>
        </div>
        </ContentBox>
      )
  }

export default LoginScreen