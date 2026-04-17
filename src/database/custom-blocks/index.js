import { database } from '../index'

export async function getAllBlocks() {
  return database.getAll('customBlocks')
}

export async function addBlock(block) {
  return database.add('customBlocks', block)
}

export async function addBlocks(blocks) {
  for (const block of blocks) {
    await addBlock(block)
  }
}

export async function deleteBlock(id) {
  return database.delete('customBlocks', id)
}

export async function updateBlock(block) {
  return database.put('customBlocks', block)
}
