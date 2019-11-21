import React from 'react'

const Bullet = ({ color = 'gray', size = 17 }) => {
  const s = {
    backgroundColor: color,
    height: `${size}px`,
    width: `${size}px`,
    display: 'block',
    border: '2px solid #fff',
    borderRadius: '50%',
    marginRight: '8px',
    float: 'left'
  }
  return <i style={s} />
}

export default Bullet
