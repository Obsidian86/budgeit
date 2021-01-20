import React, { useState, useContext, useEffect } from 'react'
import { IP } from '../../utilities/formUtilities'
import { makeCall } from '../../api/apiCall'
import ContentBox from "../interface/ContentBox"
import MainContext from '../../providers/MainContext'
import s from './styles'
import { submitForm } from './functions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
    const history = useHistory()
    const p = useContext(MainContext)

    const [formType, updateFormType] = useState('login')
    const [formData, updateFormData] = useState({})
    const [formErrors, updateFormErrors] = useState({})
    const [formState, updateFormState] = useState('static')

    useEffect(() => {
        if (p.profile) {
            history.push('/dashboard')
        }
        window.addEventListener('keydown', enterPress)
        return(() => window.removeEventListener('keydown', enterPress))
    })

    const handleChange = event => updateFormData({ ...formData, [event.target.id]: event.target.value }) 
    const enterPress = event => event.keyCode && event.keyCode === 13 && handleSubmit()
    const handleSubmit = () => submitForm(formData, formType, updateFormErrors, updateFormState, p.setUser, makeCall, p.setDialog)

    return(
        <ContentBox
            itemId='loginModule' 
            hideShrink
            exClass="new-content-box"
            exStyles={{maxWidth: '600px', margin: '120px auto 30px auto', overflow: 'hidden'}}
        >
            <h4 className='section-title pl-20 pt-10'><FontAwesomeIcon icon={faUser} />
                &nbsp; {formType === 'login' ? 'Login' : 'Register'}
            </h4>
            <div
                className='new-form'
                style={{ 
                    borderRadius: '0px',
                    padding: '10px',
                    width: 'calc(100% - 20px)'
                }}
            >
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
                        type='btn_white'
                        style={{backgroundColor: formState === 'loading' ? 'blue': null}} 
                        onChange={formState === 'static' ? handleSubmit : null} 
                        label={formState==='loading' ? 'Loading...' : formType === 'register' ? 'Register' : 'Log in'} 
                    />
                </span>
            </div>
        </ContentBox>
      )
  }

export default LoginScreen