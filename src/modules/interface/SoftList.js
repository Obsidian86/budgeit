import React from 'react'
import styled from 'styled-components'

const SoftList = ({ children, split, className, color, radius }) => {
  const List = styled.ul`
  border-radius: ${ radius ? radius : '0px'};
  list-style-type: none;
  overflow: hidden;
  padding: 0;
  margin-bottom: 20px;
  & li {
    border-bottom: ${children && children.length === 2 && '3px solid #e9e9e9'};
    padding: 12px 12px;
    padding-left: 16px;
    display: ${split ? 'flex' : 'block'};
    justify-content: space-between;
    background-color: #fff;
    &:nth-child(odd) {
      background-color: ${color ? color : '#e9e9e9'};
    }
    & span:nth-child(2){
      text-align: right;
    }
    &.header-row{
      background-color: ${color ? color : '#cdcdcd'};
      border-bottom: 1px solid #888;
      color: #444;
      font-weight: bold;
    }
  }
`
  return <List className={className}>{children}</List>
}

export default SoftList
