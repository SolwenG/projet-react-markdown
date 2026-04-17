import { useEffect, useState, useCallback } from 'react'
import {
  createMdFile,
  deleteAllFiles,
  deleteFileById,
  getAllFiles,
} from '../../database/markdown-files'
import styles from './style.module.css'

function Markdown() {
  // States
  const [files, setFiles] = useState([])
  const [computedFiles, setComputedFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')

  // Function

  const setAllFiles = useCallback((newObject) => {
    setFiles(newObject)
    const computedFiles = []
    for (let i = 0; i < 10; i++) {
      if (newObject[i]) computedFiles.push(newObject[i])
    }
    setComputedFiles(computedFiles)
  }, [])

  const fetchFiles = useCallback(async () => {
    const allFiles = await getAllFiles()
    setAllFiles(allFiles.reverse()) // Show newest first
  }, [setAllFiles])

  async function handleCreateFile(event) {
    event.preventDefault()
    await createMdFile({ name, description, body })
    // Clear form
    setName('')
    setDescription('')
    setBody('')
    // After creating, we refetch the files to update the list.
    await fetchFiles()
  }

  async function deleteFile(id) {
    await deleteFileById(id)
    // After deleting, we refetch the files to update the list.
    await fetchFiles()
  }

  async function handleDeleteAll() {
    // A confirmation would be good here in a real app!
    await deleteAllFiles()
    await fetchFiles()
  }

  // Effects
  useEffect(() => {
    fetchFiles()
    console.log('Montage du composant')
  }, [fetchFiles])

  // Render
  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateFile} className={styles.form}>
        <h2>Create a new file</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>
            Content (Markdown):
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Create File
        </button>
      </form>

      <div className={styles.fileListContainer}>
        <details open>
          <summary className={styles.summary}>Files: {files.length}</summary>
          <button type="button" onClick={handleDeleteAll} className={styles.deleteAllButton}>
            Delete All Files
          </button>
          <ul className={styles.list}>
            {computedFiles.map((file) => (
              <li key={file.id} className={styles.listItem}>
                <span>
                  {file.name} - {new Date(file.date).toLocaleString()}
                </span>
                <button type="button" onClick={() => deleteFile(file.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  )
}

export default Markdown
