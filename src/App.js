import React, { useContext, useState, useEffect, Suspense } from 'react'
import TopBar from './modules/components/TopBar/TopBar'
import Footer from './modules/Footer'
import MainContext from './providers/MainContext'
import SaveLoad from './modules/SaveLoad'
import LoginScreen from './modules/LoginScreen/LoginScreen'
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import DashNav from './modules/components/DashNav'
import Stepper from './modules/components/Stepper'
import GlobalLoad from './modules/components/GlobalLoad'
import SideNav from './modules/components/SideNav/SideNav'
import appStyles from './appStyles'

const IncomeForm = React.lazy(() => import('./modules/IncomeForm'))
const SavingsCalc = React.lazy(() => import('./modules/SavingsCalc/SavingsCalc'))
const YourBudget = React.lazy(() => import('./modules/Budget/'))
const Credit = React.lazy(() => import('./modules/Credit'))
const Recommended = React.lazy(() => import('./modules/Recommended'))
const EmergencyFunds = React.lazy(() => import('./modules/EmergencyFunds/'))
const Accounts = React.lazy(() => import('./modules/Accounts/'))
const Checkbook = React.lazy(() => import('./modules/Checkbook/'))
const SnapShots = React.lazy(() => import('./modules/SnapShots/SnapShots'))
const CalendarModule = React.lazy(() => import('./modules/CalendarModule'))
const Dashboard = React.lazy(() => import('./modules/Dashboard'))
const Profile = React.lazy(() => import('./modules/Profile'))
const version = '1.10.01'

const routeData = [
  { link: '/login', component: LoginScreen },
  { link: '/emergency', component: EmergencyFunds },
  { link: '/accounts', component: Accounts },
  { link: '/checkbook', component: Checkbook },
  { link: '/profile', component: Profile },
  { link: '/savings', component: SavingsCalc },
  { link: '/recommended', component: Recommended },
  { link: '/budget', component: YourBudget },
  { link: '/credit', component: Credit },
  { link: '/sources', component: IncomeForm },
  { link: '*', component: Dashboard },
]

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  const [sideBarOpen, updateSideBarOpen] = useState(false)

  const isLoggedIn = true
  let isOpen = p.isMobile ? sideBarOpen : true;
  const s = appStyles(isOpen, p.isMobile)

  useEffect(() => {
    let interVal
    if (isLoggedIn) interVal = setInterval(p.refreshToken, 720000)
    return (() => {
      if (isLoggedIn) clearInterval(interVal)
    })
  })

  const hasSource = p.incomeSources.length > 0
  const hasBudgetItem = Object.keys(p.budget).length > 0
  const hasAccount = p.accounts.length > 0
  const display = p.globalLoad ? <GlobalLoad />
    : <>
      <DashNav updateAccData={updateAccData} accData={accData} Link={Link} isMobile={p.isMobile} getLink={p.getLink} profile={p.profile} />
      {accData && <SaveLoad />}
      {(!hasSource || !hasBudgetItem || !hasAccount) &&
        <Stepper hasSource={hasSource} hasAccount={hasAccount} hasBudgetItem={hasBudgetItem} getLink={p.getLink} theme={p.theme} />
      }
      <Switch>
        <Route path={p.getLink('/snapshots')} render={() =>
          <Suspense fallback={<GlobalLoad />} >
            <SnapShots />
            <CalendarModule nonLoad />
          </Suspense>
        } />
        <Route path={p.getLink('/calendar')} render={() =>
          <Suspense fallback={<GlobalLoad />} >
            <CalendarModule />
            <SnapShots nonLoad />
          </Suspense>
        } />
        {routeData.map(rd =>
          <Route
            path={p.getLink(rd.link)}
            render={() =>
              <Suspense fallback={<GlobalLoad />} >
                <rd.component />
              </Suspense>
            }
            key={rd.link}
          />
        )}
      </Switch>
    </>

  const navProps = { Link, sideBarOpen, isMobile: p.isMobile, updateSideBarOpen }
  return (
    <div className='App container'>
      <Router>
        <div style={s.mainWrapper}>
          {isOpen && <SideNav style={s.sideBar} {...navProps} getLink={p.getLink} user={p.profile} logout={p.logout} setDialog={p.setDialog} />}
          <TopBar updateView={p.updateView} isLoggedIn={isLoggedIn} {...navProps} />
          <div style={s.mainContent}>
            <div className='row'>
              {display}
            </div>
            <Footer version={version} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
