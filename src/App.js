import React, { useContext, useState, useEffect } from 'react'
import IncomeForm from './modules/IncomeForm'
import TopBar from './modules/components/TopBar/TopBar'
import Recommended from './modules/Recommended'
import YourBudget from './modules/YourBudget'
import SavingsCalc from './modules/SavingsCalc/SavingsCalc'
import Footer from './modules/Footer'
import MainContext from './providers/MainContext'
import EmergencyFunds from './modules/EmergencyFunds'
import CalendarModule from './modules/CalendarModule'
import Accounts from './modules/Accounts'
import SaveLoad from './modules/SaveLoad'
import SnapShots from './modules/SnapShots/SnapShots'
import LoginScreen from './modules/LoginScreen/LoginScreen'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import DashNav from './modules/components/DashNav'
import Stepper from './modules/components/Stepper'
import GlobalLoad from './modules/components/GlobalLoad'

const version = '1.04.3-beta'

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  const step = (p.amount !== null ? 1 : 0) + (Object.keys(p.budget).length > 0 ? 1 : 0)
  
  const loggedIn = () => {
    const token = localStorage.getItem('aKey') ? localStorage.getItem('aKey') : null
    const user = p.profile
    if(!user || !token) return false
    if(user && token) return true
  }
  const isLoggedIn = loggedIn()
  useEffect(()=>{
    let interVal
    if(isLoggedIn)interVal = setInterval(p.refreshToken, 720000)
    return(()=>{
      if(isLoggedIn)clearInterval(interVal)
    })
  })

  const display = p.globalLoad ? <GlobalLoad /> 
    : isLoggedIn ? 
    <>
      <DashNav step={step} updateAccData={updateAccData} accData={accData} Link={Link} getLink={p.getLink} />
      {accData && <SaveLoad />}
      {step < 2 && <Stepper step={step} getLink={p.getLink} theme={p.theme} />}
      <Switch>
        <Route path={p.getLink('/savings')} render={() => <SavingsCalc /> } /> 
        <Route path={p.getLink('/calendar')} render={() => 
          <>
            <SnapShots />
            {step > 1 && <CalendarModule />}
          </> } />
        <Route path={p.getLink('/budget')} render={()=> 
          <>
            {step > 0 && <Recommended />}
            {step > 0 && <YourBudget step={step} />}
          </> } />
        <Route path={p.getLink('/accounts')} render={()=> 
          <>
            {step > 1 && <EmergencyFunds />}
            <Accounts />
          </> } />
        <Route path={p.getLink('*')} render={()=> <IncomeForm /> } />
      </Switch>
    </>
    : <LoginScreen />
  

  return (
    <div className='App container'>
        <Router>
          <TopBar updateView={p.updateView} step={step} Link={Link} isLoggedIn={isLoggedIn} />
          <div className='row'>
            { display }
          </div>
          <Footer version={version} />
        </Router>
    </div>
  )
}

export default App
