import React, { useContext, useState } from "react";
import MainContext from "../providers/MainContext";
import { convert, disRec, percent, up } from "../utilities/convert";
import ChartContainer from "./components/ChartContainer";
import TableRow from "./interface/TableRow";
import Bullet from "./interface/Bullet";
import ProgressBar from "./interface/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BudgetForm from './components/BudgetForm'
import suggested from '../utilities/suggested'
import ContentBox from './interface/ContentBox'

const YourBudget = ({ step }) => {
  const p = useContext(MainContext);
  const [displayForm, toggleForm] = useState(true);
  const [editItem, updateEditItem] = useState(null);
  const [errors, updateErrors] = useState(null)
  const data = [];

  const amountLeft =
    convert(p.amount, "w", p.viewBy) - convert(p.total, "m", p.viewBy);

  const percentLeft =
    (convert(p.total, "m", p.viewBy) / convert(p.amount, "w", p.viewBy)) * 100;

  const validateData = (bi) => {
    let errs = {}
    if(bi.startDate && bi.endDate && new Date(bi.startDate) > new Date(bi.endDate)){
      errs['endDate'] = 'End date can not come before start date'
    }
    const fields = [
      { name: 'amount', req: true, type: 'number' },
      { name: 'item', req: true, type: 'text' },
      { name: 'startDate', req: true, type: 'text' },
      { name: 'EndDate', req: true, type: 'text' }
    ]
    fields.forEach(f => {
      if (f.req && !bi[f.name]) errs[f.name] = 'Field is required'
      if ( bi[f.name] && f.type === 'number' && isNaN(bi[f.name])) {
        let test = bi[f.name].split(" ").join('')
        if (isNaN(test)) errs[f.name] = 'Please input a number'
      }
    })
    updateErrors(errs)
    return (Object.keys(errs).length === 0)
  }


  const catOptions = [];
  const track = []
  Object.keys({ ...p.budget, ...suggested }).forEach(b => {
    let bI = b.toLowerCase()
    if (!track.includes(bI)) {
      catOptions.push({ d: bI, v: bI })
      track.push(bI)
    }
  })

  data.push({
    title: "Unallocated",
    value: isNaN(percentLeft) ? 100 : (100 - percentLeft),
    color: "gray"
  });
  Object.keys(p.budget).forEach(bd => {
    data.push({
      title: bd,
      value:
        (convert(p.budget[bd].total, "m", p.viewBy) /
          convert(p.amount, "w", p.viewBy)) *
        100,
      color: p.budget[bd].color
    });
  });

  return (
    <ContentBox title='Your budget'>
      <div className="row mt-40">
        {" "}
        {/* chart section */}
        <div className="sm">
          <ChartContainer
            data={data}
            styles={{ maxWidth: "400px", margin: "0 auto" }}
          />
          <div
            className="contentBox row"
            style={{
              padding: "10px",
              marginTop: "25px"
            }}
          >
            <p className="text-left w-100">
              <strong>{convert(p.total, "m", p.viewBy, "money")}</strong> budgeted of
              <strong> {convert(p.amount, "w", p.viewBy, "money")}</strong>
            </p>
            <ProgressBar
              percent={percentLeft}
              title={percentLeft.toFixed(2) + "%"}
            />
            <p className="text-right w-100">
              <strong>{convert(amountLeft, p.viewBy, p.viewBy, "money")}</strong> Remianing{" "}
              {disRec(p.viewBy)}
            </p>
          </div>
        </div>{" "}
        {/* End chart section */}
        <div className="md">
          {step < 2 ? <h2 style={{ textAlign: 'center', marginTop: '75px' }}>Add a budget item</h2> : Object.keys(p.budget).map(bud => {
            return (
              <div key={bud} style={{ marginBottom: "33px" }}>
                <TableRow className="headerRow">
                  <div>
                    <Bullet color={p.budget[bud].color} size="13" /> {up(bud)}
                  </div>
                  <div>
                    <span style={{ paddingRight: '12px' }}>{percent(p.budget[bud].total, convert(p.amount, "w", "m"))} &nbsp;&nbsp; |</span>
                    {convert(p.budget[bud].total, "m", p.viewBy, "money")}
                  </div>
                </TableRow>
                {p.budget[bud].items.map((pb, index) => {
                  return (
                    <TableRow
                      onClick={() => {
                        updateEditItem(pb)
                        toggleForm(true)
                      }}
                      key={index + "-" + pb.name}
                    >
                      <div>{pb.item}</div>
                      <div>{convert(pb.amount, "m", p.viewBy, "money")}</div>
                    </TableRow>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="sm">
          <span className='right'>
            <button className={`btn ${displayForm && 'red'}`} onClick={() => {
              updateEditItem(null)
              toggleForm(!displayForm)
            }}>
              <FontAwesomeIcon icon={faPlusCircle} style={{ rotate: displayForm ? 'deg(35)' : 'deg(0)' }} />
              &nbsp;&nbsp; {displayForm ? "Cancel" : "Add"} budget item
        </button>
          </span>
            {displayForm && <BudgetForm
              catOptions={catOptions}
              editItem={editItem}
              updateEditItem={updateEditItem}
              deleteBudgetItem={p.deleteBudgetItem}
              setDialog={p.setDialog}
              errors={errors}
              onSubmit={bi => {
                if (!validateData(bi)) return null
                !editItem && p.addBudgetItem(bi)
                editItem && p.updateBudgetItem(editItem, bi)
                updateEditItem(null)
                toggleForm(false)
              }}
            />} 
        </div>
      </div>
    </ContentBox>
  );
};

export default YourBudget;
