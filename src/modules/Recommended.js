import React, { useContext } from "react";
import { getPercent, convert, up } from "../utilities/convert";
import MainContext from "../providers/MainContext";
import TableRow from "./interface/TableRow";
import percents from '../utilities/suggested'
import ContentBox from "./interface/ContentBox";
import ProgressBar from "./interface/ProgressBar";

const Recommended = () => {
  const p = useContext(MainContext);

  return (
    <ContentBox title='Recommended' exClass='lg' itemId='recommendedModule'>
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
              const perc = p.budget[per.toLowerCase()] ? (parseFloat(p.budget[per.toLowerCase()].total) / convert(parseFloat(p.amount), 'w', 'm') ) * 100 : null
              let color = p.theme.vBlue
              if(perc < percents[per][0]){
                color = 'green'
              }else if(perc > percents[per][1]){
                color = 'red'
              }

              return (
                <React.Fragment key={index}>
                  <TableRow style={{backgroundColor: index % 2 === 1 ? p.theme.fBlue : '#fff'}}>
                    <div>{up(per)}</div>
                    {percents[per].map((pe, index) => (
                      <div key={index}>
                        {pe}% <br />
                        {convert(getPercent(pe, p.amount), "w", p.viewBy, "money")}
                      </div>
                    ))}
                  </TableRow>
                  {p.budget[per.toLowerCase()] && <div>
                      <ProgressBar 
                        title=''
                        percent= {perc}
                        color={color} 
                        bg={p.theme.fBlue} 
                        height={2} paddingTop='-24px'
                        marks={percents[per]}
                      />
                  </div>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      </ContentBox>
  );
};

export default Recommended;
