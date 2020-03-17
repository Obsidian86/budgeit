const sideBarWidth = 276;
const appStyles = (isOpen, isMobile)=> 
  {
    return ({
        sideBar: {
          backgroundColor: 'green',
          position: 'fixed',
          display: isOpen ? 'block' : 'none',
          width: isOpen ? `${sideBarWidth}px` : "0",
          height: '100%',
          minHeight: '100vh',
          zIndex: '3'
        },
        mainContent: {
          width: isOpen && !isMobile ? `calc(100% - ${sideBarWidth}px)` : '100%',
          marginLeft: isOpen && !isMobile ? `${sideBarWidth}px` : "0"
        },
        mainWrapper: {
          display: 'flex',
          height: '100%'
        }
      })
  }
export default appStyles