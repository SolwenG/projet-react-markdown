import { useEffect, useState } from 'react'
import {
  createMdFile,
  deleteAllFiles,
  deleteFileById,
  getAllFiles,
} from '../../database/markdown-files'

function Markdown() {
  // States
  const [files, setFiles] = useState([])
  const [computedFiles, setComputedFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')

  // Function

  async function fetchFiles() {
    const allFiles = await getAllFiles()
    setAllFiles(allFiles.reverse()) // Show newest first
  }

  async function handleCreateFile(event) {
    event.preventDefault()
    await createMdFile({ name, description, body })
    // Clear form
    setName('')
    setDescription('')
    setBody('')
    // After creating, we refetch the files to update the list.
    const allFiles = await getAllFiles()
    setAllFiles(allFiles.reverse())
    // await fetchFiles()
  }

  async function deleteFile(id) {
    await deleteFileById(id)
    // After deleting, we refetch the files to update the list.
    const allFiles = await getAllFiles()
    setAllFiles(allFiles.reverse())
    // await fetchFiles()
  }

  function setAllFiles(newObject) {
    setFiles(newObject)
    const computedFiles = []
    for (let i = 0; i < 10; i++) {
      computedFiles.push(newObject[i])
    }
    setComputedFiles(computedFiles)
  }

  async function handleDeleteAll() {
    // A confirmation would be good here in a real app!
    await deleteAllFiles()
    const allFiles = await getAllFiles()
    setAllFiles(allFiles.reverse())
    // await fetchFiles()
  }

  // Effects
  useEffect(() => {
    fetchFiles()
    console.log('Montage du composant')
  }, [])

  // Render
  return (
    <div>
      <form onSubmit={handleCreateFile}>
        <h2>Create a new file</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Content (Markdown):</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create File</button>
      </form>

      <hr />
      <h1>Files: {files.length}</h1>
      <button type="button" onClick={handleDeleteAll}>
        Delete All Files
      </button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} - {new Date(file.date).toLocaleString()}
            <button type="button" onClick={() => deleteFile(file.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Markdown
