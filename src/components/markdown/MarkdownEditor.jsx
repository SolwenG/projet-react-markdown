import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useMarkdownFiles from '../../hooks/useMarkdownFiles.js'
import useModal from '../../hooks/useModal.js'
import ImportModal from '../global/ImportModal.jsx'
import { exportAsFile } from '../../utils/mdlcFiles.js'
import { useBlockShortcuts } from '../../hooks/useBlockShortcuts.js'

export default function MarkdownEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { allFiles, handleCreate, handleUpdate, handleDelete } =
    useMarkdownFiles()
  const images = useSelector((state) => state.images.items)
  const importModal = useModal(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef(null)
  const [loadedId, setLoadedId] = useState(null)

  const file = id !== 'new' ? allFiles.find((f) => String(f.id) === id) : null

  if (id === 'new' && loadedId !== 'new') {
    setName('')
    setDescription('')
    setBody('')
    setLoadedId('new')
  } else if (id !== 'new' && file && loadedId !== id) {
    setName(file.name || '')
    setDescription(file.description || '')
    setBody(file.body || '')
    setLoadedId(id)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (id === 'new') {
      await handleCreate({ name, description, body })
      navigate('/markdown')
    } else {
      await handleUpdate(Number(id), { name, description, body })
      navigate('/markdown')
    }
  }

  const onDelete = async () => {
    if (id !== 'new') {
      await handleDelete(Number(id))
    }
    navigate('/markdown')
  }

  const onExport = () => {
    if (id !== 'new') {
      exportAsFile(body, name || 'Untitled', 'md')
    }
  }

  const handleInsertBlock = useCallback((contentToInsert) => {
    if (!textareaRef.current) {
      setBody((prev) => prev + '\n' + contentToInsert)
      return
    }
    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd

    setBody((prev) => {
      const before = prev.substring(0, start)
      const after = prev.substring(end, prev.length)
      return before + contentToInsert + after
    })

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(
          start + contentToInsert.length,
          start + contentToInsert.length
        )
      }
    }, 0)
  }, [])

  useBlockShortcuts(handleInsertBlock)

  useEffect(() => {
    const handleEvent = (e) => handleInsertBlock(e.detail)
    window.addEventListener('insertCustomBlock', handleEvent)
    window.addEventListener('insertImage', handleEvent)
    return () => {
      window.removeEventListener('insertCustomBlock', handleEvent)
      window.removeEventListener('insertImage', handleEvent)
    }
  }, [handleInsertBlock])

  let previewContent =
    body || `# ${t('markdownEditor.emptyPreview', 'Nothing to preview')}`
  images.forEach((img) => {
    previewContent = previewContent.replace(`!${img.name}`, `![${img.name}](${img.base64})`)
  })

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {id === 'new'
            ? t('markdownEditor.newFile')
            : t('markdownEditor.editFile')}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {showPreview
              ? t('markdownEditor.edit')
              : t('markdownEditor.preview')}
          </button>
          <button
            type="button"
            onClick={importModal.open}
            className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t('importModal.importMarkdownFiles', 'Import')}
          </button>
          {id !== 'new' && (
            <button
              type="button"
              onClick={onExport}
              className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('markdownEditor.exportMd')}
            </button>
          )}
          {id !== 'new' && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 text-white text-sm border bg-gray-700  rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('markdownEditor.deleteFile')}
            </button>
          )}
        </div>
      </div>

      {showPreview ? (
        <div
          className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: marked.parse(previewContent),
          }}
        />
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-gray-900">
              {t('markdownEditor.fileName')}:
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="font-semibold text-gray-900"
            >
              {t('markdownEditor.description')}:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg min-h-[100px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="font-semibold text-gray-900">
              {t('markdownEditor.content')}:
            </label>
            <textarea
              id="body"
              ref={textareaRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg min-h-[300px] font-mono"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/markdown')}
              className="px-4 py-2 text-sm border bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('markdownEditor.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('markdownEditor.save')}
            </button>
          </div>
        </form>
      )}

      <ImportModal
        isOpen={importModal.isOpen}
        onClose={importModal.close}
        mode="markdown"
      />
    </div>
  )
}
