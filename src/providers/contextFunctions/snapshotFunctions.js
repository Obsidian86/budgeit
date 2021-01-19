import { saveResource } from './storage'

export const addSnapShot = async (data, snapshots, username, saveState) => {
  let response
  if (username) {
    response = await saveResource("save", "snapshots", data, username, null)
  } else {
    response = { data: [{...data, id: Date.now()}] }
  }
  if(response && response.data && response.data.length > 0){
    const newSnapshot = response.data[0]
    saveState({ snapshots: [...snapshots, {...newSnapshot}]})
  }
}

export const deleteSnapShot = async (index, snapshots, username, saveState) => {
  const id = snapshots[index].id
  if (username) {
    await saveResource("delete", "snapshots", null, username, id)
  }
  saveState({ snapshots: [...snapshots.filter(snap => snap.id !== id) ]})
}