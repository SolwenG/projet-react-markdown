import { database } from ".."

async function createMdFile(fileDetails) {
  const { name, body, description, folderId } = fileDetails
  const date = Date.now()
  const newId = await database.add('files', {
    name: name || `New File ${date}`,
    body: body || '# Hello World',
    description: description || 'A new markdown file',
    folderId: folderId || null,
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

async function getAllFiles() {
  return await database.getAllFromIndex('files', 'date')
}

async function deleteAllFiles() {
  await database.clear('files')
}

export { getAllFiles, deleteFileById, createMdFile, deleteAllFiles }
