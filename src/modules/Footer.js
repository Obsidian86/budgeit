import React from 'react'

const Footer = ({version}) => {
  const footerStyles = {
    width: '100%',
    paddingTop: '1px',
    paddingBottom: '25px',
    textAlign: 'center',
    fontSize: '.8rem',
    color: '#fff'
  }
  const date = new Date()
  return (
    <div style={footerStyles}> <br />
      &copy; {date.getFullYear()}{' '}
      All Rights Reserved.{' '}
      <a href='https://jovial-wescoff-607830.netlify.app' target='_blank' rel="noopener noreferrer">{version}</a>
    </div>)
}

export default Footer
