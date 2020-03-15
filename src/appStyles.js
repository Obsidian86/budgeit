const appStyles = (isOpen, isMobile)=> 
  {
    return ({
        sideBar: {
          backgroundColor: 'green',
          position: 'fixed',
          display: isOpen ? 'block' : 'none',
          width: isOpen ? '300px' : "0",
          height: '100%',
          minHeight: '100vh',
          zIndex: '3'
        },
        mainContent: {
          width: isOpen && !isMobile ? 'calc(100% - 300px)' : '100%',
          marginLeft: isOpen && !isMobile ? '300px' : "0"
        },
        mainWrapper: {
          display: 'flex',
          height: '100%'
        }
      })
  }
export default appStyles