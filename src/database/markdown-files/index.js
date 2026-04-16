import { database } from ".."

async function createMdFile(fileDetails) {
  const { name, body, description } = fileDetails
  const newId = await database.add('files', {
    name: `New File ${Date.now()}`,
    body: '# Hello World',
    description: 'A new markdown file',
    date: Date.now(),
  })
  console.log(`File added with id: ${newId}`)
  const newFile = await database.get('files', newId)
  console.log('Retrieved file:', newFile)
}

async function deleteFileById(id) {
  await database.delete('files', id)
  // After deleting, we should refetch the files to update the list
  const newObject = await database.getAllFromIndex('files', 'date')
  // getFiles(newObject)
}

async function getAllFiles() {
  return await database.getAllFromIndex('files', 'date')
}

export { getAllFiles, deleteFileById, createMdFile }
