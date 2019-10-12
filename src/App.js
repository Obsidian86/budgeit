import React from "react";
import MainForm from "./modules/MainForm";
import TopBar from "./modules/TopBar";
import Recommended from "./modules/Recommended";
import YourBudget from "./modules/YourBudget";
import SavingsCalc from "./modules/SavingsCalc";

function App() {
  return (
    <div className="App container">
      <TopBar />
      <div className="row">
        <MainForm />
        <Recommended />
        <YourBudget />
        <SavingsCalc />
      </div>
    </div>
  );
}

export default App;
