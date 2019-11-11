import React from "react";
import ReactDOM from "react-dom";
import Cal from "./Cal";

function App() {
  return (
    <div className="App" style={{ width: "100%", maxWidth: '1200px', margin: '0 auto' }}>
      <Cal
        items={[
          { item: "asdasdok", date: "11-21-2019" },
          { item: "weokwae 2", date: "11-21-2019" },
          { item: "we tesk 2", date: "12-2-2019" },
          { item: "oasdk", date: "2-11-2020" },
          { item: "range 1-15-2020 5-15", date: "1-15-2020", end: "5-15-2020", rec: 'monthly' },
          { item: "rt 31 test 11-23-19 5-15-20", date: "12-31-2019", end: "5-31-2020", rec: 'monthly' },
          { item: "year test", date: "11-31-2017", end: "5-31-2025", rec: 'yearly' },
          { item: "weekly", date: "11-31-2017", end: "5-31-2025", rec: 'weekly' },
          { item: "biWeekly", date: "11-31-2017", end: "5-31-2025", rec: 'biWeekly' },
          { item: "xxxweekly", date: "11-1-2010", end: "5-31-2025", rec: 'weekly' }
        ]}
        clickEvent={(d)=> console.log(d)}
        clickDay={(d)=> console.log(d)}
        clickNext={(d)=>console.log(d)}
        clickPrev={(d)=>console.log(d)}
        clickThisDate={(d)=>console.log(d)}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);