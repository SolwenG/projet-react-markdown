import { database } from '..'

async function createMdFile(fileDetails) {
  const { name, body, description, folderId } = fileDetails
  const date = Date.now()
  const newId = await database.add('files', {
    name: name || `New File ${date}`,
    body: body || '# Hello World',
    description: description || 'A new markdown file',
    folderId: folderId ? Number(folderId) : null,
    date: date,
  })
  console.log(`File added with id: ${newId}`)
  const newFile = await database.get('files', newId)
  console.log('Retrieved file:', newFile)
  return newFile
}

async function deleteFileById(id) {
  await database.delete('files', id)
}

async function updateMdFile(id, fileDetails) {
  const existing = await database.get('files', id)
  if (!existing) throw new Error('File not found')
  const updated = { ...existing, ...fileDetails, date: Date.now() }
  await database.put('files', updated)
  return updated
}

async function getAllFiles() {
  const files = await database.getAll('files')
  return files.sort((a, b) => a.date - b.date)
}

async function deleteAllFiles() {
  await database.clear('files')
}

async function createFolder(folderDetails) {
  const { name, parentId } = folderDetails
  const newId = await database.add('folders', {
    name: name || 'New Folder',
    parentId: parentId || null,
    createdAt: new Date().toISOString(),
  })
  return await database.get('folders', newId)
}

async function getAllFolders() {
  return await database.getAll('folders')
}

async function updateFolder(id, folderDetails) {
  const existing = await database.get('folders', id)
  if (!existing) throw new Error('Folder not found')
  const updated = { ...existing, ...folderDetails }
  await database.put('folders', updated)
  return updated
}

async function deleteFolderById(id) {
  // Delete all files in this folder first
  const allFiles = await database.getAll('files')
  const filesInFolder = allFiles.filter((f) => f.folderId === id)
  for (const file of filesInFolder) {
    await database.delete('files', file.id)
  }
  // Then delete the folder
  await database.delete('folders', id)
}

export {
  getAllFiles,
  deleteFileById,
  createMdFile,
  deleteAllFiles,
  updateMdFile,
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolderById,
}
