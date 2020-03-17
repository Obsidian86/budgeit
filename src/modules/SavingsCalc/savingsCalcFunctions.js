import React from 'react'
 
export const deleteTable = (tableId, setDialog, deleteSavingsTables, updateView) => {
    setDialog({
      open: true,
      header: 'Delete table', 
      message: <>Are you sure you want to delete this table? <br /> This can not be undone.</>, 
      confirm: ()=>{
        deleteSavingsTables(tableId)
        updateView('savingsModule')
      },
      reject: ()=>{ return null }
    })  
  }