import React from 'react'

const ProgressBar = ({ title = ' ', percent = 50, height = 32 }) => {
  const containerStyles = {
    border: '1px solid red',
    height: `${height}px`,
    width: '100%',
    position: 'relative',
    backgroundColor: 'pink'
  }
  const fillStyles = {
    backgroundColor: 'red',
    position: 'absolute',
    left: '0',
    height: `${height}px`,
    top: '0',
    width: `${percent > 100 ? 100 : percent}%`
  }
  const titleStyles = {
    zIndex: '2',
    width: '100%',
    textAlign: 'center',
    padding: '0',
    paddingTop: `${height / 3 - 5}px`,
    fontWeight: 'bold',
    margin: '0',
    position: 'relative',
    color: '#fff',
    textShadow: '0 0 4px red',
    fontSize: '1.1rem'
  }
  return (
    <div style={containerStyles}>
      <p style={titleStyles}>{title}</p>
      <div style={fillStyles} />
    </div>
  )
}

export default ProgressBar
