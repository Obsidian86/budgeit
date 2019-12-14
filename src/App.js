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
import SnapShots from './modules/SnapShots'
import { IP } from './utilities/formUtilities'

const version = 1.03

function App() {
  const p = useContext(MainContext)
  const [accData, updateAccData] = useState(false)
  const step = (p.amount !== null ? 1 : 0) + (Object.keys(p.budget).length > 0 ? 1 : 0)

  return (
    <div className='App container'>
      <TopBar updateView={p.updateView} step={step} />
      <div className='row'>
        <div className='right' style={{width: '97%', marginBottom: '17px'}}>
          <IP type={`btn_narrow${!accData ? '_green' : '_red'}`}
            style={{marginRight: '0', marginBottom: '13px'}}
            onChange={()=>updateAccData(!accData)} label='Export / import accounts' />
        </div>
        {accData && <SaveLoad />}
        <IncomeForm />
        {step > 0 && <Recommended />}
        {step > 0 && <YourBudget step={step} />}
        <SavingsCalc step={step} />
        {step > 1 && <EmergencyFunds />}
        <Accounts />
        {step > 1 && <CalendarModule />}
        <SnapShots />
      </div>
      <Footer version={version} />
    </div>
  )
}

export default App
