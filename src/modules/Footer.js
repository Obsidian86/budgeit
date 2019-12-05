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
      All Rights Reserved.{' '}
      <a href='https://obsidian86.github.io/budgeit/' target='_blank' rel="noopener noreferrer">1.01</a>
    </div>)
}

export default Footer
