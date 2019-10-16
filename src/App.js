import React from "react";
import IncomeForm from "./modules/IncomeForm";
import TopBar from "./modules/TopBar";
import Recommended from "./modules/Recommended";
import YourBudget from "./modules/YourBudget";
import SavingsCalc from "./modules/SavingsCalc";

function App() {
  return (
    <div className="App container">
      <TopBar />
      <div className="row">
        <IncomeForm />
        <Recommended />
        <YourBudget />
        <SavingsCalc />
      </div>
    </div>
  );
}

export default App;
