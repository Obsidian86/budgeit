import React, { useContext } from 'react'
import IncomeForm from './modules/IncomeForm'
import TopBar from './modules/components/TopBar/TopBar'
import Recommended from './modules/Recommended'
import YourBudget from './modules/YourBudget'
import SavingsCalc from './modules/SavingsCalc'
import Footer from './modules/Footer'
import MainContext from './providers/MainContext'
import EmergencyFunds from './modules/EmergencyFunds'
import CalendarModule from './modules/CalendarModule'
import Accounts from './modules/Accounts'

function App () {
  const p = useContext(MainContext)

  const updateView = (view) => {
    const targ = document.getElementById(view)
    const top = (!targ || view === 'default') ? 0 : targ.offsetTop - 90
    window.scrollTo(0, top)
  }

  let step = 0
  if (p.amount !== null) step++
  if (Object.keys(p.budget).length > 0) step++

  return (
    <div className='App container'>
      <TopBar updateView={updateView} />
      <div className='row'>
        <IncomeForm />
        {step > 0 && <Recommended />}
        {step > 0 && <YourBudget step={step} />}
        <SavingsCalc step={step} />
        {step > 0 && <EmergencyFunds />}
        <Accounts />
        <CalendarModule />
      </div>
      <Footer />
    </div>
  )
}

export default App
