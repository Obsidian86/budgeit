import React, { useContext, useState } from "react";
import IncomeForm from "./modules/IncomeForm";
import TopBar from "./modules/components/TopBar/TopBar";
import Recommended from "./modules/Recommended";
import YourBudget from "./modules/YourBudget";
import SavingsCalc from "./modules/SavingsCalc";
import Footer from './modules/Footer';
import MainContext from './providers/MainContext'
import EmergencyFunds from "./modules/EmergencyFunds";
import CalendarModule from './modules/CalendarModule'

const CurrentAccounts = () => {
  return(
    <div>
      <div>list acc</div>
      <div>add acc</div>
      <div>
        total
        acc analysis
      </div>
    </div>
  )
}

function App() {
  const p = useContext(MainContext)
  const [view, updateView] = useState('default')

  let step = 0;
  if (p.amount !== null) step++
  if (Object.keys(p.budget).length > 0) step++

  console.log(view)

  return (
    <div className="App container">
      <TopBar updateView={updateView} />
      <div className="row">
        <IncomeForm />
        {step > 0 && <Recommended />}
        {step > 0 && <YourBudget step={step} />}
        <SavingsCalc step={step} />
        {step > 0 && <EmergencyFunds />}
        <CurrentAccounts />
        <CalendarModule />
      </div>
      <Footer />
    </div>
  );
}

export default App;
