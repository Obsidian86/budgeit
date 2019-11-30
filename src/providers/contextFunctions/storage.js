import { genId } from '../../utilities/functions'

export const getProfiles = () => {
  const getProfs = localStorage.getItem('profiles')
  if(getProfs){
    const profiles = JSON.parse(getProfs)
    return (profiles.profiles && profiles.profiles.length >  0) ? profiles.profiles : null
  }
  return null
}

export const save = (data, profile) =>{
  if(!profile) {
    profile = genId()
    const currentProfiles = getProfiles()
    const profiles = currentProfiles ? [...currentProfiles, profile] : [profile]
    localStorage.setItem('profiles', JSON.stringify({profiles}))
  }
  localStorage.setItem(profile, JSON.stringify({...data, profile}))
  return profile
}

export const load = (profile) => {
  if(!profile){ // load most recent
    const profiles = getProfiles()
    if(profiles && profiles.length > 0) profile = profiles[profiles.length -1]
  }
  let tryProfile = localStorage.getItem(profile)
  if(tryProfile) return {...JSON.parse(tryProfile), profile}
  return null
}

export const deleteCurrent = (profile) => {
  localStorage.removeItem(profile)
  let profs = getProfiles()
  profs = profs.filter(p => p !== profile)
  localStorage.setItem('profiles', JSON.stringify({profs}))
}

export const saveAndNew = (data, profile) => { // {profiles: ['pr1', 'pr2']}
  save(data, profile)
  return genId()
}

export const deleteData = () => localStorage.clear()