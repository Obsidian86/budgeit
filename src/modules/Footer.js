import React from 'react'

const Footer = ({version}) => {
  const footerStyles = {
    width: '100%',
    paddingTop: '1px',
    paddingBottom: '25px',
    textAlign: 'center',
    fontSize: '.8rem'
  }
  return (
    <div style={footerStyles}> <br />
      &copy; {new Date().getFullYear()}{' '}
      All Rights Reserved.{' '}
      <a href='https://obsidian86.github.io/budgeit/' target='_blank' rel="noopener noreferrer">{version}</a>
    </div>)
}

export default Footer
