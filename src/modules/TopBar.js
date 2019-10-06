import React, { useContext } from "react";
import { convert, disRec } from "../utilities/convert";
import styled from "styled-components";
import DropDown from "./interface/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../providers/MainContext";

const TopBar = () => {
  const p = useContext(MainContext);

  const StTopBar = styled.div`
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: white;
    padding: 0;
    color: ${p.theme.green};
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    p,
    ul {
      margin: 0;
      padding-top: 7px;
      font-weight: bold;
    }
    .logo {
      background-color: ${p.theme.green};
      padding: 7px 10px 7px 10px;
      border-radius: 4px;
      color: white;
    }
    & div {
      padding-top: 10px;
      padding-bottom: 10px;
      width: 96%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `;

  return (
    <StTopBar>
      <div>
        <p className="logo">
          <FontAwesomeIcon icon={faMoneyBill} />
          &nbsp; Budge-it
        </p>

        <DropDown
          icon={<FontAwesomeIcon icon={faCalendarAlt} />}
          options={[
            { v: "y", d: "Yearly" },
            { v: "m", d: "Monthly" },
            { v: "w", d: "Weekly" },
            { v: "bw", d: "Bi-weekly" }
          ]}
          isSet={disRec(p.viewBy)}
          callBack={v => p.updateViewBy(v)}
        />
        <p>{p.amount && convert(p.amount, "w", p.viewBy, "money")}</p>
      </div>
    </StTopBar>
  );
};

export default TopBar;
