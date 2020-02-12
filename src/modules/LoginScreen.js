import React, { useState } from 'react'
import { IP } from '../utilities/formUtilities'
import ContentBox from "./interface/ContentBox"

const LoginScreen = () => {
    const [formType, updateFormType] = useState('login')
    const [formData, updateFormData] = useState({})
    const [formErrors, updateFormErrors] = useState({})
    const [formState, updateFormState] = useState('static')


    const handleChange = (event) => {
        console.log(event.target)
        updateFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const submitForm = () => {
        updateFormState('loading')
        // console.log(formData)

        //make call

        //set username + auth key in local and profile in state
    }

    return(
        <ContentBox title='Login' itemId='loginModule' hideShrink>
        <div className='row mt-40'>
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
            <span className='grouping right mt-10'>
                <IP 
                    type='btn'
                    style={{backgroundColor: 'blue'}} 
                    onChange={formState === 'static' ? submitForm : null} 
                    label={formState==='loading' ? 'Loading...' : 'Log in'} 
                />
            </span>
        </div>
        </ContentBox>
      )
  }

export default LoginScreen