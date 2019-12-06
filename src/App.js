import React, { useContext, useState } from 'react'
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
import SaveLoad from './modules/SaveLoad'

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  let step = 0
  if (p.amount !== null) step++
  if (Object.keys(p.budget).length > 0) step++

  return (
    <div className='App container'>
      <TopBar updateView={p.updateView} step={step} />
      <div className='row'>
        <IncomeForm />
        {step > 0 && <Recommended />}
        {step > 0 && <YourBudget step={step} />}
        <SavingsCalc step={step} />
        {step > 0 && <EmergencyFunds />}
        <Accounts />
        <CalendarModule />
        <div className='right' style={{width: '98%'}}>
          <button 
            onClick={()=>updateAccData(!accData)}
            className={`btn narrow mt-10 mb-10 ${!accData ? 'green' : 'red'}`}
            style={{marginRight: '0'}}
          >
            Export / import accounts
          </button>
        </div>
        {accData && <SaveLoad />}
      </div>
      <Footer />
    </div>
  )
}

export default App
