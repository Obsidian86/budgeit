import React from 'react'

const ProgressBar = ({ title = ' ', hideShadow, percent = 50, height = 32, color = 'red', bg = 'pink', fontSize= '1.1rem', paddingTop, marks, fontColor, inConStyles = {} }) => {
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
    color: fontColor ? fontColor : '#fff',
    textShadow: hideShadow ? 'none' : `0 0 4px ${color}`,
    fontSize: fontSize
  }
  return (
    <div style={{...containerStyles, ...inConStyles}}>
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
                borderRight: '2px solid #999'
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
