import React from 'react'
import '../../styles/scroll.css'

const Scroll = ({ children, height, width }) => {
  let testHeight = (children[1].length - 5) * 45
  const containerStyles = {
    width: width ? width + 'px' : '100%',
    height: (testHeight < height ? testHeight : height) + 'px',
    overflow: 'hidden', 
  }
  const scrollStyles = {
    boxShadow: '0 0 3px gray',
    height: (testHeight < height ? testHeight : height) + 9 + 'px',
    width:  width ? width + 'px' : '100%',
    overflowX: 'scroll'
  }
  return (
    <div style={containerStyles}>
      <div style={scrollStyles}>{children}</div>
    </div>
  )
}

export default Scroll
