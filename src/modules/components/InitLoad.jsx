import React from 'react'

const InitLoad = () => {
    return(
      <div style={{'height': '100vh', 'display': 'flex', 'alignItems': 'center', 'fontSize': '1.2rem', 'color': 'green', 'width': '100%', 'justifyContent': 'flex-center'}}>
        <div className="logo" style={{'margin': '0 auto'}}>
            <img src='images/favicon-32x32.png' alt='' style={{'margin': '0 auto', 'display': 'block'}} />
            <p style={{'fontWeight': 'bold', 'width': '100%', 'textAlign': 'center'}}>
              loading...
            </p>
        </div>
      </div>
    )
  }

export default InitLoad