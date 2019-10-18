import React from 'react'

const Footer = () => {
    const footerStyles = {
        width: '100%',
        paddingTop: '1px',
        paddingBottom: '20px',
        textAlign: 'center',
        fontSize: '.8rem'
    }
    return(
        <div style={footerStyles}>
            &copy; {new Date().getFullYear()}{' '}
            All Rights Reserved
        </div>)
}

export default Footer