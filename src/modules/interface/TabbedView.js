import React, { useState } from 'react'
import styled from 'styled-components'

const TabbedView = ({
  tabContent = [],
  height = 'auto',
  rounded = false,
  activeColor = '#fff',
  inactiveColor = '#c9c9c9',
  bodyColor = null
}) => {
  const [tab, updateTab] = useState(0)

  const StyledTabView = styled.div`
      width: 100%;
      .tabbedView-tab-list {
        display: flex;
        padding: 0;
        margin: 0;
        .tabbedView-tab {
          margin: 0;
          margin-bottom: -3px;
          text-align: center;
          list-style-position: inside;
          padding-top: 10px;
          padding-bottom: 4px;
          list-style-type: none;
          width: ${100 / tabContent.length}%;
          cursor: pointer;
          background-color: ${inactiveColor};
          border-radius: ${rounded ? '5px 5px 0 0' : null};
          &.selectedTab {
            background-color: ${activeColor};
            margin-top: -5px;
          }
        }
      }
      .tabbedView-tabbed-container {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: ${bodyColor || activeColor};
        height: ${height};
        border-radius: ${rounded ? '0 0 5px 5px' : null};
        h2 {
          text-align: center;
        }
      }
    `

  return (
    <StyledTabView>
      <ul className='tabbedView-tab-list'>
        {tabContent.map((c, i) => (
          <li
            key={i}
            onClick={() => updateTab(i)}
            className={`tabbedView-tab ${i === tab ? 'selectedTab' : null}`}
          >
            {c.tab}
          </li>
        ))}
      </ul>
      <div className='tabbedView-tabbed-container'>{tabContent[tab] && tabContent[tab].content}</div>
    </StyledTabView>
  )
}

export default TabbedView
