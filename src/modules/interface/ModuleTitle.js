import React, { useContext } from 'react'
import styled from 'styled-components'
import MainContext from '../../providers/MainContext'

const ModuleTitle = ({ title, icon }) => {
  const p = useContext(MainContext)

  const StH2 = styled.h2`
    color: ${p.theme.green};
    margin-top: 5px;
    margin-left: 11px;
    font-size: 1.4rem;
    border: 1px solid ${p.theme.lightGray};
    border-top: none;
    border-left: none;
    padding: 24px 30px 17px 24px;
    float: left;
    position: absolute;
    top: -12px;
    left: -18px;
    & .title{
      display: block;
      float: left;
      margin-top: 7px;
    }
    & .icon{
      margin-right: 15px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      padding: 4px;
      float: left;
      align-items: center;
      justify-content: center;
      display: flex;
      color: #fff;
      background-color: ${p.theme.green};
    }
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
      <StH2>{icon ? <span className='icon'>{icon}</span> : null}<span className='title'>{title}</span></StH2>
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
