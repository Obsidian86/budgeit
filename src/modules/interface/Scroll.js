import React, { useState, useEffect } from 'react'
import '../../styles/scroll.css'

const Scroll = ({ children, height, width }) => {
  const [useHeight, updateUseHeight] = useState(null)

  const scrollId = 'scroll-item-' + Date.now() + Math.round(Math.random() * 10) + '-' + Math.round(Math.random() * 10)

  useEffect(() => {
    const item = document.getElementById(scrollId)
    const computedStyles = window.getComputedStyle(item)
    const itemHeight = parseFloat(computedStyles.getPropertyValue('height'))

    if (itemHeight !== useHeight) {
      updateUseHeight(itemHeight)
    }

  }, [scrollId, useHeight])

  let containerStyles = {
    width: width ? width + 'px' : '100%',
    overflow: 'hidden', 
  }
  let scrollStyles = {
    boxShadow: '0 0 3px gray',
    width:  width ? width + 'px' : '100%',
    overflowX: 'hidden',
    overflowY: 'scroll'
  }

  if (useHeight && useHeight !== 0) {
    const useItemHeight = useHeight > height ? height : useHeight
    containerStyles.height = useItemHeight + 'px'
    scrollStyles.height = useItemHeight + 'px'
  }

  return (
    <div style={containerStyles} id={scrollId}>
      <div style={scrollStyles}>{children}</div>
    </div>
  )
}

export default Scroll
