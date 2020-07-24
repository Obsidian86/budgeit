export const submitForm = async (formData, formType, updateFormErrors, updateFormState, setUser, makeCall, setDialog) => {
  let errors = {}

  if(!formData['username'] || formData['username'].replace(/ /g, '') === '') errors['username'] = 'Username required'
  if(formData['username'] && formData['username'].length <= 4) errors['username'] = 'Username must be longer than 4 characters'
  if(!formData['password'] || formData['password'].replace(/ /g, '') === '') errors['password'] = 'password required' 
  if(formData['password'] && formData['password'].length <= 4) errors['password'] = 'Password must be longer than 4 characters'
    if(formType === 'register'){
      if(!formData['rePassword']) errors['rePassword'] = 'password required' 
      if(formData['rePassword'] !== formData['password']) errors['rePassword'] = 'passwords do not match' 
    }
  if( Object.keys(errors).length > 0) return updateFormErrors(errors)
  else{
    const username = formData['username']
    const password = formData['password']
    const body = { 
      username: formType === 'login' ? 'bd_' + username : username, 
      password 
    }
    if(formType === 'register') body['rePassword'] = formData['rePassword'] 
    let loginData = {
      endPoint: formType === 'login' ? 'token' : 'createUser',
      body,
      method: 'POST'
    }
    setDialog({open: true, message: formType === 'register' ? 'Registering account...' :'Logging in...'})
    let loginResponse = await makeCall(loginData)

    if(formType === 'register'){
      if(loginResponse && loginResponse.data && loginResponse.data.length > 0 && loginResponse.data[0].id){
        loginData = { 
          endPoint: 'token',
          body: {...body, username: 'bd_' + username}, 
          method: 'POST' 
        }
        loginResponse = await makeCall(loginData)
      }
    }

    setDialog({open: false})
    if(loginResponse && loginResponse.access && loginResponse.refresh){
      updateFormErrors(errors)
      updateFormState('static')
      localStorage.setItem('aKey', JSON.stringify([loginResponse.access, loginResponse.refresh, Date.now()]))
      localStorage.setItem('user', username)
      setUser(username)
    } else if (loginResponse && loginResponse.detail && loginResponse.detail === "No active account found with the given credentials"){
      errors['message'] = 'Incorrect username or password'
      updateFormErrors(errors)
      updateFormState('static')
    } else {
      errors['message'] = formType === 'login' ? 'Failed to log in.' : 'Failed to create user.'
      updateFormErrors(errors)
      updateFormState('static')
    }
  }
}