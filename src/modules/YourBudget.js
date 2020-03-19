import React, { useContext, useState } from "react";
import MainContext from "../providers/MainContext";
import { convert, disRec, percent, up } from "../utilities/convert";
import ChartContainer from "./components/ChartContainer";
import TableRow from "./interface/TableRow";
import Bullet from "./interface/Bullet";
import ProgressBar from "./interface/ProgressBar";
import BudgetForm from './components/BudgetForm'
import suggested from '../utilities/suggested'
import ContentBox from './interface/ContentBox'
import { validForm } from '../utilities/formUtilities'
import { pDate } from './components/calendar/dateFunctions'

const YourBudget = ({ step }) => {
  const p = useContext(MainContext);
  const [displayForm, toggleForm] = useState(Object.keys(p.budget).length < 1 && window.innerWidth >= 900);
  const [editItem, updateEditItem] = useState(null);
  const [errors, updateErrors] = useState(null)
  const data = [];

  const moduleName = 'yourBudgetModule'

  const amountLeft = convert(p.amount, "w", p.viewBy) - convert(p.total, "m", p.viewBy);
  const percentLeft = (convert(p.total, "m", p.viewBy) / convert(p.amount, "w", p.viewBy)) * 100;

  const validateData = (bi) => {
    const fields = [
      { name: 'amount', req: true, type: 'number' },
      { name: 'item', req: true, type: 'text' },
      { name: 'date', req: true, type: 'text' }
    ]
    const errs = validForm(fields, bi)
    if(bi.date && bi.end && pDate(bi.date) > pDate(bi.end)){
      errs['end'] = 'End date can not come before start date'
    }
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
  const okPercent = percentLeft > -1 && percentLeft !== Infinity
  return (
    <ContentBox title='Your budget' itemId={moduleName}>
      <div className="row mt-40">
        {/* chart section */}
        <div className="sm">
          {okPercent && <ChartContainer
            data={data}
            styles={{ 
              maxWidth: "400px", 
              margin: "0 auto",
              position: 'relative',
              left: '-3px'
            }}
          />}
          <div
            className="contentBox row"
            style={{
              minWidth: 'auto',
              padding: "10px",
              marginTop: "25px",
              width: '86%'
            }}
          >
            <p className="text-left w-100">
              <strong>{convert(p.total, "m", p.viewBy, "money")}</strong> budgeted of
              <strong> {convert(p.amount, "w", p.viewBy, "money")}</strong>
            </p>
            <ProgressBar
              percent={ okPercent ? percentLeft : 0}
              title={ okPercent ? percentLeft.toFixed(2) + "%" : 0 + '%'}
            />
            <p className="text-right w-100">
              <strong>{convert(amountLeft, p.viewBy, p.viewBy, "money")}</strong> Remianing{" "}
              {disRec(p.viewBy)}
            </p>
          </div>
        </div>
        {/* End chart section */}
        <div className={displayForm ? 'md' : 'm-lg'} >
          {step < 2 ? <h2 style={{ textAlign: 'center', marginTop: '75px' }}>Add a budget item</h2> : Object.keys(p.budget).map(bud => {
            return (
              <div key={bud} style={{ marginBottom: "33px" }}>
                <TableRow className="headerRow">
                  <div> <Bullet color={p.budget[bud].color} size="13" /> {up(bud)} </div>
                  <div className='h-560'>Date</div>
                  <div className='h-560'>End date</div>
                  <div>Recurrence</div>
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
                      <div className='h-560'>{ pb.date }</div>
                      <div className='h-560'>{ pb.end ? pb.end : 'No end' }</div>
                      <div>{ pb.rec ? disRec(pb.rec) : 'Once'}</div>
                      <div>
                        {convert(pb.amount, pb.rec, p.viewBy, "money")} <br />
                        <span style={{fontSize: '.9rem', color: '#b9b9b9', fontStyle: 'italic'}}>{disRec(p.viewBy)}</span>
                      </div>
                    </TableRow>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={displayForm ? 'sm' : 'xs'} >
          <span className='right md-center'>
            <button className={`btn big ${displayForm && 'red'}`} onClick={() => {
              updateEditItem(null)
              toggleForm(!displayForm)
            }}>{displayForm ? "Hide" : "Show"} form
        </button>
          </span>
            {displayForm && <BudgetForm
              catOptions={catOptions}
              editItem={editItem}
              updateEditItem={updateEditItem}
              deleteBudgetItem={p.deleteBudgetItem}
              setDialog={p.setDialog}
              errors={errors}
              updateView={p.updateView}
              onSubmit={bi => {
                if(bi.noEnd && bi.noEnd ==='on'){ delete bi.end }
                if (!validateData(bi)) return null
                !editItem && p.addBudgetItem(bi)
                editItem && p.updateBudgetItem(editItem, bi)
                updateEditItem(null)
                toggleForm(false)
                p.updateView('yourBudgetModule')
              }}
            />} 
        </div>
      </div>
    </ContentBox>
  );
};

export default YourBudget;
