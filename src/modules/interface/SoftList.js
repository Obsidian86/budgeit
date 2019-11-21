import React from "react";
import styled from "styled-components";

const SoftList = ({ children, split}) => {
  const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
  margin-bottom: 20px;
  & li {
    border-bottom: ${children && children.length === 2 && '3px solid #e9e9e9'};
    padding: 12px 12px;
    padding-left: 16px;
    display: ${split ? 'flex' : 'block'};
    justify-content: space-between;
    background-color: #fff;
    &:nth-child(odd) {
      background-color: #e9e9e9;
    }
  }
`;
  return <List>{children}</List>;
};

export default SoftList;
