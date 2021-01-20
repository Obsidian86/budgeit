import React, { useContext } from 'react'
import styled from 'styled-components'
import MainContext from '../../providers/MainContext'

const ModuleTitle = ({ title, icon }) => {
  const p = useContext(MainContext)

  const StH2 = styled.h2`
    color: #fff;
    font-size: 1.4rem;
    border-top: none;
    border-left: none;
    padding-left: 6px;
    display: flex;
    width: 100%;
    & .title{
      display: block;
      margin-top: 7px;
    }
    & .icon{
      margin-right: 15px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      padding: 4px;
      align-items: center;
      justify-content: center;
      display: flex;
      color: ${p.theme.darkGray};
      background-color: #fff;
    }
  `

  return (
    <>
      <StH2>{icon ? <span className='icon'>{icon}</span> : null}<span className='title'>{title}</span></StH2>
    </>
  )
}

export default ModuleTitle
