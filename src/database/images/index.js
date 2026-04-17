import { database } from '../index.js'

export const addImage = async (name, base64) => {
  const id = await database.add('images', { name, base64, date: new Date() })
  return { id, name, base64 }
}

export const getAllImages = async () => {
  return database.getAll('images')
}

export const deleteImage = async (id) => {
  return database.delete('images', id)
}

export const renameImage = async (id, newName) => {
  const image = await database.get('images', id)
  const updated = { ...image, name: newName }
  await database.put('images', updated)
  return updated
}
