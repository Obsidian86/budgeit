import React, { useContext, useState } from "react";
import MainContext from "../providers/MainContext";
import { convert, disRec, percent } from "../utilities/convert";
import ChartContainer from "./ChartContainer";
import TableRow from "./interface/TableRow";
import Bullet from "./interface/Bullet";
import ModuleTitle from "./interface/ModuleTitle";
import ProgressBar from "./interface/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BudgetForm from './components/BudgetForm'

const YourBudget = () => {
  const p = useContext(MainContext);
  const [displayForm, toggleForm] = useState(false);
  const [editItem, updateEditItem] = useState(null);
  const data = [];
  const amountLeft =
    convert(p.amount, "w", p.viewBy) - convert(p.total, "m", p.viewBy);
  const percentLeft =
    (convert(p.total, "m", p.viewBy) / convert(p.amount, "w", p.viewBy)) * 100;

  const catOptions = [];
  Object.keys(p.budget).forEach(b => catOptions.push({ d: b, v: b }))

  data.push({
    title: "Unallocated",
    value: isNaN(percentLeft) ? 100 : percentLeft,
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
    <div className="contentBox">
      <ModuleTitle title="Your budget" />
      <div className="contentBox-commands">
        <button className={`btn ${displayForm && 'red'}`} onClick={() => {
          updateEditItem(null)
          toggleForm(!displayForm)
        }}>
          <FontAwesomeIcon icon={faPlusCircle} />
          &nbsp;&nbsp; {displayForm ? "Cancel" : "Add"} budget item
        </button>
      </div>
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
        <div className={displayForm ? "md" : "lg"}>
          {Object.keys(p.budget).map(bud => {
            return (
              <div key={bud} style={{ marginBottom: "33px" }}>
                <TableRow className="headerRow">
                  <div>
                    <Bullet color={p.budget[bud].color} size="13" /> {bud}
                  </div>
                  <div>
                    <span style={{paddingRight: '12px'}}>{percent(p.budget[bud].total, convert(p.amount, "w","m")) } &nbsp;&nbsp; |</span>
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
        {displayForm && (
          <div className="sm">
            <BudgetForm
              catOptions={catOptions}
              editItem={editItem}
              updateEditItem={updateEditItem}
              deleteBudgetItem={p.deleteBudgetItem}
              onSubmit={bi => {
                !editItem && p.addBudgetItem(bi)
                editItem && p.updateBudgetItem(editItem, bi)
                updateEditItem(null)
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBudget;
