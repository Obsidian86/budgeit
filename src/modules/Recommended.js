import React, { useContext } from "react";
import { getPercent, convert } from "../utilities/convert";
import MainContext from "../providers/MainContext";
import TableRow from "./interface/TableRow";
import percents from '../utilities/suggested'
import ContentBox from "./interface/ContentBox";

const Recommended = () => {
  const p = useContext(MainContext);
  return (
    <ContentBox title='Recommended' exClass='lg'>
      <div className='row mt-40'>
        <p className='sm'>Suggested budget categories are based upon recommended percentages pulled from various resources. They are just guidelines. The exact amount will vary based on location, age, situations and lifestyle choices. </p>
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
      </ContentBox>
  );
};

export default Recommended;
