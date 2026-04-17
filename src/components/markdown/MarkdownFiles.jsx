//#region Imports
import { useEffect, useState } from 'react'
import {
  createMdFile,
  deleteAllFiles,
  deleteFileById,
  getAllFiles,
} from '../../database/markdown-files'
import { marked } from 'marked'
import styles from './css/MarkdownFiles.module.css'
//#endregion

function Markdown() {
  //#region States
  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')

  // Derived State: No need to store this in state, just calculate it on render.
  const computedFiles = files.slice(0, 10)
  //#endregion

  //#region Functions
  // Function
  async function fetchFiles() {
    const allFiles = await getAllFiles()
    setFiles(allFiles.reverse()) // Show newest first
  }

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
  //#endregion

  //#region Effects
  useEffect(() => {
    let isMounted = true

    getAllFiles().then((allFiles) => {
      if (isMounted) {
        setFiles(allFiles.reverse())
      }
    })

    console.log('Montage du composant')

    return () => {
      isMounted = false
    }
  }, [])
  //#endregion

  //Render
  return (
    <div className={styles.container}>
      <div
        className={styles.preview}
        dangerouslySetInnerHTML={{
          __html: marked.parse(
            '# Marked in Node.js\n\nRendered by **marked**.\n\n ## This is a H2. \n\n ### This is a H3'
          ),
        }}
      />
      <form onSubmit={handleCreateFile} className={styles.form}>
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
          <button
            type="button"
            onClick={handleDeleteAll}
            className={styles.deleteAllButton}
          >
            Delete All Files
          </button>
          <ul className={styles.list}>
            {computedFiles.map((file) => (
              <li key={file.id} className={styles.listItem}>
                <span>
                  {file.name} - {new Date(file.date).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => deleteFile(file.id)}
                  className={styles.deleteButton}
                >
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
