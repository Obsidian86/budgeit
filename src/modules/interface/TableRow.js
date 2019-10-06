import React from "react";
import styled from "styled-components";

const TableRow = ({ children, className, pattern = [40, 30], onClick }) => {
  const mkStyles = () => {
    let inj = ``;
    if (pattern.length > 2) {
      for (let i = 2; i < pattern.length + 1; i++) {
        inj =
          inj +
          ` &:nth-child(${i}){ 
          width: ${pattern[i - 1]}%;
        }`;
      }
    }
    return `
    cursor: ${onClick ? "pointer" : ""};
    display: flex;
    justify-content: space-between;
    width: 97%;
    margin: 0 auto;
    border-radius: 0;
    border-left: 3px solid #00bbd4;
    &:nth-child(odd) {
      background-color: #dbfdff;
    }
    div {
      width: ${pattern.length > 1 ? pattern[1] : pattern[0]}%;
      text-align: right;
      padding: 13px 10px;
      &:first-child {
        text-align: left;
        width: ${pattern[0]}%;
      }
      ${inj}
    }
    &.headerRow {
      background-color: #00bbd4;
      font-weight: bold;
      color: #fff;
      border-color: #00bbd4;
    }
    &:not(.headerRow):hover {
      background-color: #d3d3d3;
      color: #000;
      border-color: #d3d3d3;
      z-index: 1;
    }
    
  `;
  };
  let TR = styled.div`
    ${mkStyles()}
  `;

  return (
    <TR className={className} onClick={onClick ? onClick : null}>
      {children}
    </TR>
  );
};

export default TableRow;
