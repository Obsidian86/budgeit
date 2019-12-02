import React from 'react'

const ProgressBar = ({ title = ' ', percent = 50, height = 32, color = 'red', bg = 'pink', fontSize= '1.1rem', paddingTop, marks }) => {
  const containerStyles = {
    border: `1px solid ${color}`,
    height: `${height}px`,
    width: '100%',
    position: 'relative',
    backgroundColor: bg
  }
  const fillStyles = {
    backgroundColor: color,
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
    paddingTop: paddingTop ? paddingTop : `${height / 3 - 5}px`,
    fontWeight: 'bold',
    margin: '0',
    position: 'relative',
    color: '#fff',
    textShadow: `0 0 4px ${color}`,
    fontSize: fontSize
  }
  return (
    <div style={containerStyles}>
      {
        marks && marks.map((m, i) => 
          <div key={i}
            style={
              {
                height: height + 4,
                position: 'absolute',
                top: '-2px',
                left: m + '%',
                width: '1px',
                borderRight: '2px solid black'
              }
            }
          />
        )
      }
      <p style={titleStyles}>{title}</p>
      <div style={fillStyles} />
    </div>
  )
}

export default ProgressBar
