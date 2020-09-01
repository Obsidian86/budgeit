import React, { useContext, useState, useEffect } from 'react'
import ContentBox from '../interface/ContentBox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import MainContext from '../../providers/MainContext';
import { getAge, parsedCurrentDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities'

const Profile = () => {
    const p = useContext(MainContext)
    const [updated, updateUpdated] = useState({
        status: null,
        error: false,
        message: null
    })
    const [formData, updateFormData] = useState({})

    const email = p.userInfo && p.userInfo.email
    const dob = p.userInfo && p.userInfo.dob && p.userInfo.dob !== '' ? p.userInfo.dob : '1-1-1990'

    useEffect(() => {
        updateFormData({
            email, dob
        })
    }, [email, dob])

    const submitForm = () => {
        let error = false
        let useFormData = { ...formData }
        let dataUpdated = (formData.email && formData.email !== email) || (formData.dob && formData.dob !== dob)

        if (formData['pass-1'] || formData['pass-2']) {
            dataUpdated = true
            if ((formData['pass-1'] && !formData['pass-2']) || (formData['pass-2'] && !formData['pass-1'])) {
                error = true
                return updateUpdated({ status: true, error: true, message: 'Passwords must match' })
            } else {
                if (formData['pass-1'] !== formData['pass-2']) {
                    error = true
                    return updateUpdated({ status: true, error: true, message: 'Passwords must match' })
                } else {
                    if (formData['pass-1'].length < 6) {
                        error = true
                        return updateUpdated({ status: true, error: true, message: 'Password length must be greater than 6 characters' })
                    } else {
                        useFormData.password = formData['pass-1']
                        delete useFormData['pass-1']
                        delete useFormData['pass-2']
                    }
                }
            }
        }

        if (!dataUpdated) {
            return updateUpdated({ status: true, error: true, message: 'No information has changed' })
        }

        if (!error) {
            p.updateUserData(useFormData)
                .then(res => {
                    if (res && res.success) {
                        updateUpdated({ status: true, error: false, message: 'Information updated' })
                    } else {
                        updateUpdated({ status: true, error: true, message: 'Error updating data' })
                    }
                })
                .catch(() => {
                    updateUpdated({ status: true, error: true, message: 'Error updating data' })
                })
        }
    }

    const resetForm = () => updateFormData({ email, dob })

    const updateField = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const age = formData.dob ? getAge(formData.dob) : null

    return (
        <ContentBox title='Profile' icon={<FontAwesomeIcon icon={faUserAlt} />} >
            <div className='content-pad t-left'>
                {updated.status &&
                    <div className={`important ${updated.error ? '' : 'good'}`}>
                        <span onClick={() => updateUpdated({ status: false, message: null, error: false })}>X</span>
                        {updated.message}
                    </div>
                }
                <h3>Username </h3>
                <p className='ml-20 muted'>{p.profile}</p>
                <h3>Information </h3>
                <div className='row'>
                    <div className='md'>
                        <IP
                            type='text'
                            alias="email"
                            label='Email address'
                            data={formData}
                            onChange={e => updateField(e)}
                        />
                    </div>
                    <div className='md'>
                        <IP
                            type='date'
                            alias="dob"
                            label='Date of birth'
                            data={formData}
                            onChange={val => updateField({ target: { value: parsedCurrentDate(val), name: 'dob' } })}
                        />
                        {age && <p className='ml-20 muted'>Age: {age} </p>}
                    </div>
                </div>

                <h3>Password </h3>
                <div className='row mb-20'>
                    <div className='md'>
                        <IP
                            type='password'
                            alias="pass-1"
                            label='Password'
                            showPH="password"
                            data={formData}
                            onChange={e => updateField(e)}
                        />
                    </div>
                    <div className='md'>
                        <IP
                            type='password'
                            alias="pass-2"
                            label='Re-type password'
                            showPH="password"
                            data={formData}
                            onChange={e => updateField(e)}
                        />
                    </div>
                </div>
                <div className='right'>
                    <button className='btn red' onClick={resetForm}> Reset </button>
                    <button className='btn green' onClick={submitForm}> Update </button>
                </div>
            </div>
        </ContentBox>
    )
}

export default Profile