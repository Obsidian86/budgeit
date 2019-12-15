import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Dialog = ({ data, setDialog }) => {
  const [mounted, updateMounted] = useState(false)
  useEffect(() => {
    updateMounted(true)
  }, [])

  const { header, message, confirm, reject, yesText = 'Yes', noText = 'Cancel' } = data
  const StDialog = styled.div`
        .dialogContainer{
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100%;
            background-color: rgba(0, 0, 0, .6);
            box-shadow: 0 0 4px #000;
            z-index: 1000 !important;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 120s;
            &.mountedDialog{
                opacity: 1;
            }
            .dialogContent{
                background-color: #fff;
                width: 94%;
                max-width: 800px;
                border: 1px solid gray;
                box-shadow: 0 0 0 8px #fff;
                h3{
                    padding-left: 20px;
                    padding-bottom: 17px;
                    border-bottom: 1px solid gray;
                }
                p{
                    text-align: center;
                    width: 100%;
                    padding: 20px;
                    ${!header && 'padding-top: 36px;'}
                    font-size: 1.05rem;
                }
                div{
                    padding: 16px;
                    padding-right: 0;
                    padding-top: 0;
                    button { margin-left: 20px; }
                }
            }
        }
        
    `

  const handleClick = (action) => {
    action()
    setDialog({ open: false })
  }

  return (
    <StDialog>
      <div className={`dialogContainer ${mounted && 'mountedDialog'}`}>
        <div className='dialogContent'>
          {header && <h3>{header}</h3>}
          {message && <p>{message}</p>}
          {(confirm || reject) &&
          <div className='grouping right'>
            {confirm && <button onClick={() => handleClick(confirm)} className='btn'>{yesText}</button>}
            {reject && <button onClick={() => handleClick(reject)} className='btn red'>{noText}</button>}
          </div>}
        </div>
      </div>
    </StDialog>
  )
}

export default Dialog
