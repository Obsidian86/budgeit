import React, { useContext, useState, useEffect, Suspense } from 'react'
import TopBar from './modules/components/TopBar/TopBar'
import Footer from './modules/Footer'
import MainContext from './providers/MainContext'
import SaveLoad from './modules/SaveLoad'
import LoginScreen from './modules/LoginScreen/LoginScreen'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import DashNav from './modules/components/DashNav'
import Stepper from './modules/components/Stepper'
import GlobalLoad from './modules/components/GlobalLoad'
import SideNav from './modules/components/SideNav/SideNav'
import appStyles from './appStyles'

const IncomeForm = React.lazy(() => import('./modules/IncomeForm'))
const SavingsCalc = React.lazy(() => import('./modules/SavingsCalc/SavingsCalc'))
const YourBudget = React.lazy(() => import('./modules/Budget/'))
const Recommended = React.lazy(() => import('./modules/Recommended'))
const EmergencyFunds = React.lazy(() => import('./modules/EmergencyFunds'))
const Accounts = React.lazy(() => import('./modules/Accounts/'))
const Checkbook= React.lazy(() => import('./modules/Checkbook/'))
const SnapShots = React.lazy(() => import('./modules/SnapShots/SnapShots'))
const CalendarModule = React.lazy(() => import('./modules/CalendarModule'))

const version = '1.08.6-beta'

const routeData = [
  { link: '/emergency', component: EmergencyFunds, step: 1},
  { link: '/accounts', component: Accounts},
  { link: '/checkbook', component: Checkbook},
  { link: '/profile', component: Accounts},
  { link: '/savings', component: SavingsCalc},
  { link: '/recommended', component: Recommended},
  { link: '/budget', component: YourBudget, step: 0},
  { link: '*', component: IncomeForm},
]

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  const [sideBarOpen, updateSideBarOpen] = useState(false)
  const step = ((p.amount === null || p.amount === 0 || p.amount === '0') ? 0 : 1) + (Object.keys(p.budget).length > 0 ? 1 : 0)
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
        <Route path={p.getLink('/snapshots')} render={() => 
          <Suspense fallback={<GlobalLoad />} >  
            { step > 1 && <SnapShots /> } 
            { step > 1 && <CalendarModule nonLoad /> } 
          </Suspense>
        } />
        <Route path={p.getLink('/calendar')} render={() => 
          <Suspense fallback={<GlobalLoad />} >
            { step > 1 && <CalendarModule /> } 
            { step > 1 && <SnapShots nonLoad /> } 
          </Suspense> 
        } />
        { routeData.map(rd =>
          <Route 
            path={p.getLink(rd.link)} 
            render={()=> 
              <Suspense fallback={<GlobalLoad />} >
                {Object.prototype.hasOwnProperty.call(rd, 'step') ?
                    step > rd.step ? 
                    <rd.component step={step} /> : <></>
                    : <rd.component step={step} />}
                
              </Suspense> 
            } 
            key={rd.link}
          />
        )}
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
