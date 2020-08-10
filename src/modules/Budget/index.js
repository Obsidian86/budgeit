import React, { useContext, useState } from "react";
import MainContext from "../../providers/MainContext";
import { convert, disRec, percent, up } from "../../utilities/convert";
import TableRow from "../interface/TableRow";
import Bullet from "../interface/Bullet";
import BudgetForm from './BudgetForm.jsx'
import ContentBox from '../interface/ContentBox'
import ChartSection from './ChartSection'
import { validForm } from '../../utilities/formUtilities'
import { pDate } from '../components/calendar/dateFunctions'
import * as budgetFunctions from './budgetFunctions'
import s from './styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const YourBudget = ({ step }) => {
  const p = useContext(MainContext);
  const [displayForm, toggleForm] = useState(Object.keys(p.budget).length < 1 && window.innerWidth >= 900);
  const [editItem, updateEditItem] = useState(null);
  const [errors, updateErrors] = useState(null)
  

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

  const {catOptions, data} = budgetFunctions.processData(p, percentLeft)
  const chartProps = {percentLeft, amountLeft, data, p, s}
  const noItems = <h2 style={{ textAlign: 'center', marginTop: '75px' }}>Add a budget item</h2>
  return (
    <ContentBox title='Budget' itemId={moduleName} icon={<FontAwesomeIcon icon={faStream} />} >
      <ChartSection {...chartProps} />
      <div className="row around mt-40">
        <div className={displayForm ? 'm-lg' : 'lg'} >
          {step < 2 ?  noItems : Object.keys(p.budget).map(bud => {
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
                        <span style={s.tableRec}>{disRec(p.viewBy)}</span>
                      </div>
                    </TableRow>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={displayForm ? 'm-sm' : 'xs'} >
          <span className='right md-center'>
            <button className={`btn big ${displayForm && 'red'}`} onClick={() => {
              updateEditItem(null)
              toggleForm(!displayForm)
            }}>
              {displayForm ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              &nbsp; {displayForm ? " Hide" : " Show"} form
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
              accountList={p.accounts}
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
