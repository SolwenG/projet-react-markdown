import { useEffect, useState } from 'react'
import { markdownDatabase } from '../../db'

function Markdown() {
  // States
  const [files, getFiles] = useState([])

  // Function
  async function createMdFile() {
    const newId = await markdownDatabase.add('files', {
      title: 'AGENT 1',
      date: Date.now(),
      body: 'Test',
    })
    console.log(`File added with id: ${newId}`)
    const newFile = await markdownDatabase.get('files', newId)
    console.log('Retrieved file:', newFile)
  }

  async function deleteFile(id) {
    
  }

  // Effects
  useEffect(() => {
    const fetchFiles = async () => {
      const newObject = await markdownDatabase.getAllFromIndex('files', 'date')
      getFiles(newObject)

      console.log(await markdownDatabase.getAllFromIndex('files', 'date'))
      console.log('Montage du composant')
    }

    fetchFiles()
  }, [])

  // Render
  return (
    <div>
      <h1>Files:</h1>
      {/* <ul>
        {files.map((file) => (
          <li key={file.id}>{file.title}</li>
        ))}
      </ul> */}
      <textarea name="markdownArea" id="input"></textarea>
      <button type="button" onClick={createMdFile}>
        Créer
      </button>
    </div>
  )
}

export default Markdown
