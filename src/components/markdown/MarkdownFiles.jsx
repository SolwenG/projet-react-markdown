//#region Imports
import { useState } from 'react'
import { marked } from 'marked'
import useMarkdownFiles from '../../hooks/useMarkdownFiles.js'
import { useTranslation } from 'react-i18next'
//#endregion

function Markdown() {
  //#region States
  const { t } = useTranslation()
  const {
    files,
    totalFiles,
    loading,
    handleCreate,
    handleDelete,
    handleDeleteAll,
  } = useMarkdownFiles()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  //#endregion

  //#region Functions
  async function onSubmitFile(event) {
    event.preventDefault()
    await handleCreate({ name, description, body })
    // Clear form
    setName('')
    setDescription('')
    setBody('')
  }
  //#endregion

  //Render
  return (
    <div className="p-8">
      {loading && <p>{t('markdownFilesOld.loading')}</p>}
      <div
        className="p-6 bg-white border border-gray-200 rounded-lg mb-8 prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: marked.parse(
            '# Marked in Node.js\n\nRendered by **marked**.\n\n ## This is a H2. \n\n ### This is a H3'
          ),
        }}
      />
      <form
        onSubmit={onSubmitFile}
        className="flex flex-col gap-4 mb-8 max-w-2xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-gray-700">
            {t('markdownFilesOld.name')}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold text-gray-700">
            {t('markdownFilesOld.description')}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="body" className="font-semibold text-gray-700">
            {t('markdownFilesOld.content')}
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="p-2 border border-gray-300 rounded min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="self-start px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          {t('markdownFilesOld.createFile')}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <details open>
          <summary className="cursor-pointer text-xl font-semibold mb-4 text-gray-800">
            {t('markdownFilesOld.files')} {totalFiles}
          </summary>
          <button
            type="button"
            onClick={handleDeleteAll}
            className="mb-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            {t('markdownFilesOld.deleteAllFiles')}
          </button>
          <ul className="flex flex-col gap-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded shadow-sm"
              >
                <span>
                  {file.name} - {new Date(file.date).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(file.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  {t('markdownFilesOld.delete')}
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
