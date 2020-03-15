const appStyles = sideBarOpen => ({
    sideBar: {
      backgroundColor: 'green',
      position: 'fixed',
      display: sideBarOpen ? 'block' : 'none',
      width: sideBarOpen ? '300px' : "0",
      height: '100%',
      minHeight: '100vh'
    },
    mainContent: {
      boxShadow: '0 0 3px red',
      width: sideBarOpen ? 'calc(100% - 300px)' : '100%',
      marginLeft: sideBarOpen ? '300px' : "0"
    },
    mainWrapper: {
      display: 'flex',
      height: '100%'
    }
  })

  export default appStyles