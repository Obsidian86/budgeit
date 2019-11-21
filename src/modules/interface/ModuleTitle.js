import React, { useContext } from 'react'
import styled from 'styled-components'
import MainContext from '../../providers/MainContext'

const ModuleTitle = ({ title }) => {
  const p = useContext(MainContext)

  const StH2 = styled.h2`
    color: ${p.theme.green};
    margin-top: 5px;
    margin-left: 15px;
    font-size: 1.4rem;
    border: 1px solid ${p.theme.lightGray};
    border-top: none;
    border-left: none;
    padding: 24px 30px 17px 30px;
    float: left;
    position: absolute;
    top: -12px;
    left: -22px;
    &:after {
      border: 1px solid ${p.theme.lightGray};
      border-left: none;
      height: 12px;
      width: 13px;
      position: absolute;
      bottom: -8px;
      left: 0px;
      content: "";
    }
    &:before {
      border: 1px solid ${p.theme.lightGray};
      border-top: none;
      height: 13px;
      width: 12px;
      position: absolute;
      right: -7px;
      top: 0px;
      content: "";
    }
  `

  return (
    <>
      <StH2>{title}</StH2>
      <p
        style={{
          clear: 'both',
          height: '0',
          width: '0',
          background: 'none'
        }}
      />
    </>
  )
}

export default ModuleTitle
