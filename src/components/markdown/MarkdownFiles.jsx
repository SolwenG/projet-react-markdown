import { useEffect, useState } from 'react'
import { createMdFile, deleteFileById, getAllFiles } from '../../database/markdown-files'

function Markdown() {
  // States
  const [files, setFiles] = useState([])
  const [computedFiles, setComputedFiles] = useState([])

  // Function
  async function createFile() {
    await createMdFile({ })
    // After creating, we refetch the files to update the list.
    const allFiles = await getAllFiles()
    setAllFiles(allFiles)
  }

  async function deleteFile(id) {
    await deleteFileById(id)
    // After deleting, we refetch the files to update the list.
    const allFiles = await getAllFiles()
    setAllFiles(allFiles)
  }

  function setAllFiles(newObject) {
    setFiles(newObject)
    const computedFiles = []
    for (let i = 0; i < 10; i++) {
      computedFiles.push(newObject[i])
    }
    setComputedFiles(computedFiles)
  }


  // Effects
  useEffect(() => {
    async function fetchFiles() {
      const allFiles = await getAllFiles()
      setAllFiles(allFiles)
    }

    fetchFiles()
    console.log('Montage du composant')
  }, [])

  // Render
  return (
    <div>

      <h1>Files: { files.length } </h1>

      <ul>
        {
          computedFiles.map((file) => (
            <li key={file.id}>{file.title}
              {file.name} - {new Date(file.date).toLocaleString()}
              <button type="button" onClick={() => deleteFile(file.id)}>Delete</button>
            </li>
          ))
        }
      </ul>

      <textarea name="markdownArea" id="input"></textarea>

      <button type="button" onClick={createFile}>
        Créer
      </button>
    </div>
  )
}

export default Markdown
