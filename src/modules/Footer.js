import React from 'react'

const Footer = () => {
  const footerStyles = {
    width: '100%',
    paddingTop: '1px',
    paddingBottom: '20px',
    textAlign: 'center',
    fontSize: '.8rem'
  }
  return (
    <div style={footerStyles}> <br />
      &copy; {new Date().getFullYear()}{' '}
      All Rights Reserved. 0.07
    </div>)
}

export default Footer
