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
  const [retainData, updateRetainData] = useState({})

  const moduleName = 'yourBudgetModule'

  const handleBudgetItemClick = bItem => {
    updateEditItem(bItem)
    document.getElementById('add-budget-form').scrollIntoView({behavior: "smooth"})
  }

  const amountLeft = convert(p.amount, "w", p.viewBy) - convert(p.total, "m", p.viewBy);
  const percentLeft = (convert(p.total, "m", p.viewBy) / convert(p.amount, "w", p.viewBy)) * 100;

  const handleFormSubmit = budgetItemIn => {
    let bi = {...budgetItemIn}
    updateRetainData({...bi})
    if(bi.noEnd && bi.noEnd ==='on') delete bi.end
    if (!validateData(bi)) return null
    if(!bi.autoOn || bi.autoOn === 'off') bi.fromAccount = ''
    if(bi.isTransfer && bi.isTransfer === 'on') bi.fromAccount = ''
    if(bi.autoOn) delete bi.autoOn
    updateRetainData({})
    !editItem && p.addBudgetItem(bi)
    editItem && p.updateBudgetItem(editItem, bi)
    updateEditItem(null)
    toggleForm(false)
    p.updateView('yourBudgetModule')
  }

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

    if(bi.autoOn && bi.autoOn=== 'on'){
      if(!bi.fromAccount || bi.fromAccount === ''){
        errs['fromAccount'] = 'Account required for auto withdraw'
      }
    }

    if(bi.createTransfer && bi.createTransfer === 'on'){
      if(!bi.transferFromAccount || !bi.transferToAccount){
        errs['transferFromAccount'] = 'Field required to create transfer'
        errs['transferToAccount'] = 'Field required to create transfer'
      } else {
        if(bi.transferFromAccount === bi.transferToAccount) {
          errs['transferFromAccount'] = 'Transfer to can not match transfer from'
          errs['transferToAccount'] = 'Transfer to can not match transfer from'
        }
      }
    }

    updateErrors(errs)
    return (Object.keys(errs).length === 0)
  }

  const {catOptions, data} = budgetFunctions.processData(p, percentLeft)
  const chartProps = {percentLeft, amountLeft, data, p, s}
  const noItems = <h2 style={{ textAlign: 'center', marginTop: '75px' }}>Add a budget item</h2>

  const linkedTransfer = editItem && editItem.linkedTransfer
    && editItem.linkedTransfer !== '' && [...p.accountTransfers].filter(tr => tr.id + '' === editItem.linkedTransfer + '')

  return (
    <ContentBox title='Budget' itemId={moduleName} icon={<FontAwesomeIcon icon={faStream} />} >
      <ChartSection {...chartProps} />
      <div className="row around mt-40">
        <div className={displayForm ? 'm-lg' : 'lg'} >
          {Object.keys(p.budget).length < 1 ?  noItems : Object.keys(p.budget).map(bud => {
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
                        handleBudgetItemClick(pb)
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
        <div className={displayForm ? 'm-sm' : 'xs'} id='add-budget-form'>
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
              retainData={retainData}
              catOptions={catOptions}
              editItem={editItem}
              updateEditItem={updateEditItem}
              deleteBudgetItem={p.deleteBudgetItem}
              setDialog={p.setDialog}
              errors={errors}
              updateView={p.updateView}
              accountList={p.accounts.filter(a => a.accountType !== 'Credit')}
              onSubmit={bi => handleFormSubmit(bi)}
              updateRetainData={updateRetainData}
              linkedTransfer={linkedTransfer}
            />} 
        </div>
      </div>
    </ContentBox>
  );
};

export default YourBudget;
