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
      <div className='row mt-40'>
        <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className='lg'>
          <div>
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
    </div>
  );
};

export default Recommended;
