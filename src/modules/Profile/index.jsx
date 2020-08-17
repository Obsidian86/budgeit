import React, { useContext, useState, useEffect } from 'react'
import ContentBox from '../interface/ContentBox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import MainContext from '../../providers/MainContext';
import { getAge, parsedCurrentDate } from '../components/calendar/dateFunctions'
import { IP } from '../../utilities/formUtilities'

const Profile = () => {
    const p = useContext(MainContext)
    const [formData, updateFormData] = useState({})
    
    const email = p.userInfo && p.userInfo.email
    const dob = p.userInfo && p.userInfo.dob && p.userInfo.dob !== '' ? p.userInfo.dob : '1-1-1990'

    useEffect(() => {
        updateFormData({
            email, dob
        })
    }, [email, dob])

    const submitForm = () => {
        console.log(formData)
    }

    const resetForm = () => updateFormData({email, dob})

    const updateField = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const age = formData.dob ? getAge(formData.dob) : null

    return (
        <ContentBox title='Profile' icon={<FontAwesomeIcon icon={faUserAlt} />} >
            <div className='content-pad'>
                <h3>Username: </h3>
                { p.profile }
                <h3>Email </h3>
                <IP 
                    type='text' 
                    alias="email" 
                    label='Email address'
                    data={formData} 
                    onChange={e => updateField(e)} 
                />
                <h3>Date of birth </h3>
                <IP 
                    type='date' 
                    alias="dob" 
                    label='Date of birth'
                    data={formData} 
                    onChange={val => updateField({ target: { value: parsedCurrentDate(val), name: 'dob' } }) } 
                />
                {age && <p>Age: { age } </p>}
                <div className='right'>
                    <button className='btn red' onClick={resetForm}> Reset </button>
                    <button className='btn green' onClick={submitForm}> Update </button>
                </div>
            </div>
        </ContentBox>
    )
}

export default Profile