import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'

const TableRow = ({ children, className, pattern = [40, 30], onClick, tData, style, round = true, headerRow, wrap }) => {
  const mkStyles = () => {
    let inj = ''
    if (pattern.length > 2) {
      for (let i = 2; i < pattern.length + 1; i++) {
        inj =
          inj +
          ` &:nth-child(${i}){ 
          width: ${pattern[i - 1]}%;
        }`
      }
    }
    return `
    cursor: ${onClick ? 'pointer' : ''};
    display: flex;
    flex-wrap: ${wrap ? 'wrap' : 'no-wrap'};
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    border-radius: 0;
    border-left: 3px solid ${theme.vBlue};
    &:nth-child(odd) {
      background-color: ${theme.fBlue};
    }
    div {
      width: calc(${pattern.length > 1 ? pattern[1] : pattern[0]}% - 20px);
      text-align: right;
      padding: 13px 10px;
      &:first-child {
        text-align: left;
        width: calc(${pattern[0]}% - 20px);
      }
      ${inj}
    }
    &.headerRow {
      background-color:  ${theme.vBlue};
      font-weight: bold;
      color: #fff;
      border-color: ${theme.vBlue};
      border-radius: ${round ? '4px 4px 0 0' : '0'};
    }
    &:not(.headerRow):hover {
      background-color: ${theme.lightGray};
      color: #000;
      border-color: ${theme.lightGray};
      z-index: 1;
    }
  `
  }
  const StTableRow = styled.div`${mkStyles()}`

  return (
    <StTableRow className={`${className} ${headerRow ? 'headerRow' : ''}`} style={style} onClick={onClick || null}>
      {tData && tData.map((td, i) => <div key={i}>{td}</div>)}
      {children}
    </StTableRow>
  )
}

export default TableRow
