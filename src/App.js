import React, { useContext, useState, useEffect } from 'react'
import IncomeForm from './modules/IncomeForm'
import TopBar from './modules/components/TopBar/TopBar'
import Recommended from './modules/Recommended'
import YourBudget from './modules/Budget/'
import SavingsCalc from './modules/SavingsCalc/SavingsCalc'
import Footer from './modules/Footer'
import MainContext from './providers/MainContext'
import EmergencyFunds from './modules/EmergencyFunds'
import CalendarModule from './modules/CalendarModule'
import Accounts from './modules/Accounts/'
import SaveLoad from './modules/SaveLoad'
import SnapShots from './modules/SnapShots/SnapShots'
import LoginScreen from './modules/LoginScreen/LoginScreen'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import DashNav from './modules/components/DashNav'
import Stepper from './modules/components/Stepper'
import GlobalLoad from './modules/components/GlobalLoad'
import SideNav from './modules/components/SideNav/SideNav'
import appStyles from './appStyles'

const version = '1.08.3-beta'

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  const [sideBarOpen, updateSideBarOpen] = useState(false)
  const step = (p.amount !== null ? 1 : 0) + (Object.keys(p.budget).length > 0 ? 1 : 0)
  
  const loggedIn = () => {
    const token = localStorage.getItem('aKey') ? localStorage.getItem('aKey') : null
    const user = p.profile
    if(!user || !token) return false
    if(user && token) return true
  }

  const isLoggedIn = loggedIn()
  let isOpen = p.isMobile ? sideBarOpen : true;
  if(!isLoggedIn) isOpen = false
  const s = appStyles(isOpen, p.isMobile)

  useEffect(()=>{
    let interVal
    if(isLoggedIn) interVal = setInterval(p.refreshToken, 720000)
    return(()=>{
      if(isLoggedIn) clearInterval(interVal)
    })
  })
  const display = p.globalLoad ? <GlobalLoad /> 
    : isLoggedIn ? 
    <>
      <DashNav step={step} updateAccData={updateAccData} accData={accData} Link={Link} isMobile={p.isMobile} getLink={p.getLink} />
      {accData && <SaveLoad />}
      {step < 2 && <Stepper step={step} getLink={p.getLink} theme={p.theme} />}
      <Switch>
        <Route path={p.getLink('/savings')} render={() => <SavingsCalc /> } /> 
        <Route path={p.getLink('/snapshots')} render={() => 
          <> 
            { step > 1 && <SnapShots /> } 
            { step > 1 && <CalendarModule /> } 
          </> 
        } />
        <Route path={p.getLink('/recommended')} render={() => <Recommended /> } /> 
        <Route path={p.getLink('/calendar')} render={() => 
          <> 
            { step > 1 && <CalendarModule /> } 
            { step > 1 && <SnapShots /> } 
          </> 
        } />
        <Route path={p.getLink('/emergency')} render={() => <> {step > 1 && <EmergencyFunds />} </> } />
        <Route path={p.getLink('/budget')} render={()=> <> {step > 0 && <YourBudget step={step} />} </> } />
        <Route path={p.getLink('/accounts')} render={()=> <> <Accounts /> </> } />
        <Route path={p.getLink('*')} render={()=> <IncomeForm /> } />
      </Switch>
    </>
    : <LoginScreen />

  const navProps = {Link, sideBarOpen, step, isMobile: p.isMobile, updateSideBarOpen}
  return (
    <div className='App container'>
        <Router>
          <div style={s.mainWrapper}>
              {isOpen && <SideNav style={s.sideBar} {...navProps} getLink={p.getLink} user={p.profile} logout={p.logout} />}
              <TopBar updateView={p.updateView} isLoggedIn={isLoggedIn} {...navProps} />
            <div style={s.mainContent}>
              <div className='row'>
                { display }
              </div>
              <Footer version={version} />
            </div>

          </div>
        </Router>
    </div>
  )
}

export default App
