import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'

const TableRow = ({ children, className, pattern = [40, 30], onClick, tData }) => {
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
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    border-radius: 0;
    border-left: 3px solid ${theme.vBlue};
    &:nth-child(odd) {
      background-color: ${theme.fBlue};
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
      background-color:  ${theme.vBlue};
      font-weight: bold;
      color: #fff;
      border-color: ${theme.vBlue};
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
    <StTableRow className={className} onClick={onClick || null}>
      {tData && tData.map((td, i) => <div key={i}>{td}</div>)}
      {children}
    </StTableRow>
  )
}

export default TableRow
