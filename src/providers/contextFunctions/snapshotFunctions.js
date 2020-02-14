import { saveResource } from './storage'

export const addSnapShot = async (data, snapshots, username, saveState) => {
  const response = await saveResource("save", "snapshots", data, username, null)
  const newSnapshot = response.data[0]
  saveState({ snapshots: [...snapshots, {...newSnapshot}]})
}

export const deleteSnapShot = async (index, snapshots, username, saveState) => {
  const id = snapshots[index].id
  await saveResource("delete", "snapshots", null, username, id)
  saveState({ snapshots: [...snapshots.filter(snap => snap.id !== id) ]})
}