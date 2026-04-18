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

export { getAllFiles, deleteFileById, createMdFile, deleteAllFiles, updateMdFile }
