import React from 'react'
import '../../styles/scroll.css'

const Scroll = ({ children, height, width }) => {
  let testHeight = 0
  if(children && Array.isArray(children) && children.length > 0){
    children[1].forEach(element => {
      if(element) testHeight ++
    });
    testHeight = testHeight * 45
  }else if(children && !Array.isArray(children) && children.props && children.props.children){
    children.props.children.forEach(element => {
      if(element) testHeight ++
    });
    testHeight = testHeight * 55
  }
  
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
