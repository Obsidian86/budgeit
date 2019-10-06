import React, { useContext, useState } from "react";
import MainContext from "../providers/MainContext";
import { convert, disRec } from "../utilities/convert";
import ChartContainer from "./ChartContainer";
import TableRow from "./interface/TableRow";
import Bullet from "./interface/Bullet";
import Form from "./Form";
import ModuleTitle from "./interface/ModuleTitle";
import ProgressBar from "./interface/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const BudgetForm = ({ editItem, onSubmit }) => {
  return (
    <Form
      defaultFormData={editItem ? editItem : null}
      render={(updateField, formData) => {
        return (
          <>
            <label>Category </label>
            <input
              type="text"
              name="category"
              onChange={e => updateField(e)}
              value={formData && formData.category ? formData.category : ""}
            />
            <input
              type="checkbox"
              name="newCategory"
              onChange={e => updateField(e)}
            />{" "}
            New Category
            <label>Budget Item</label>
            <input
              type="text"
              name="item"
              onChange={e => updateField(e)}
              value={formData && formData.item ? formData.item : ""}
            />
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              onChange={e => updateField(e)}
              value={formData && formData.amount ? formData.amount : ""}
            />
            <label>Recurrence</label>
            <input
              type="text"
              name="recurrence"
              onChange={e => updateField(e)}
              value={formData && formData.amount ? "Monthly" : ""}
            />
            <div className="grouping right">
              <button
                type="submit"
                className="btn"
                onClick={() => onSubmit(formData)}
              >
                Submit
              </button>
            </div>
          </>
        );
      }}
    />
  );
};

const YourBudget = () => {
  const p = useContext(MainContext);
  const [displayForm, toggleForm] = useState(true);
  const [editItem, updateEditItem] = useState(null);
  const data = [];

  const amountLeft =
    convert(p.amount, "w", p.viewBy) - convert(p.total, "m", p.viewBy);
  const percentLeft =
    (convert(p.total, "m", p.viewBy) / convert(p.amount, "w", p.viewBy)) * 100;

  data.push({
    title: "Unallocated",
    value: percentLeft,
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
        <button className="btn" onClick={() => toggleForm(!displayForm)}>
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
              {convert(p.total, "m", p.viewBy, "money")} budgeted of{" "}
              {convert(p.amount, "w", p.viewBy, "money")}
            </p>
            <ProgressBar
              percent={percentLeft}
              title={percentLeft.toFixed(2) + "%"}
            />
            <p className="text-right w-100">
              {convert(amountLeft, p.viewBy, p.viewBy, "money")} Remianing{" "}
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
                    {convert(p.budget[bud].total, "m", p.viewBy, "money")}
                  </div>
                </TableRow>
                {p.budget[bud].items.map((pb, index) => {
                  return (
                    <TableRow
                      onClick={() => updateEditItem(pb)}
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
              editItem={editItem}
              onSubmit={bi => p.addBudgetItem(bi)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBudget;
