const sideBarWidth = 276;
const appStyles = (isOpen, isMobile)=> 
  {
    return ({
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