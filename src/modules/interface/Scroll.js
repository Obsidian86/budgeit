import React from 'react'
import '../../styles/scroll.css'

const Scroll = ({ children, height, width }) => {
    const containerStyles = {
      width: width ? width + "px" : '100%',
      height: height + "px",
      overflow: "hidden",
      boxShadow: 'inset -3px -3px 13px rgba(0, 0, 0, .5)'
    };
    const scrollStyles = {
      boxShadow: "0 0 3px gray",
      height: height + 17 + "px",
      width: width + "px",
      overflowX: "scroll"
    };
    return (
      <div style={containerStyles}>
        <div style={scrollStyles}>{children}</div>
      </div>
    );
  }

  export default Scroll