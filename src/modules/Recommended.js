import React, { useContext } from "react";
import { getPercent, convert } from "../utilities/convert";
import MainContext from "../providers/MainContext";
import TableRow from "./interface/TableRow";
import ModuleTitle from "./interface/ModuleTitle";

const Recommended = () => {
  const p = useContext(MainContext);
  const percents = {
    Giving: [8, 10],
    Saving: [10, 15],
    Food: [10, 15],
    utilities: [5, 10],
    Housing: [25, 30],
    Transportation: [8, 10],
    Health: [5, 10],
    Insurance: [10, 25],
    Recreation: [5, 10],
    Personal: [5, 10],
    Miscellaneous: [5, 10]
  };
  return (
    <div className="contentBox lg">
      <ModuleTitle title="Recommended" />
      <div>
        <div style={{ marginTop: "25px" }}>
          <TableRow className="headerRow">
            <div>Category</div>
            <div>Low</div>
            <div>High</div>
          </TableRow>
          {Object.keys(percents).map((per, index) => {
            return (
              <TableRow key={index}>
                <div>{per}</div>
                {percents[per].map((pe, index) => (
                  <div key={index}>
                    {pe}% <br />
                    {convert(getPercent(pe, p.amount), "w", p.viewBy, "money")}
                  </div>
                ))}
              </TableRow>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
