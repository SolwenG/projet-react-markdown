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
