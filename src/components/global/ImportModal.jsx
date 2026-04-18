import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { addMarkdownFile } from '../../store/slices/markdownSlice'
import { uploadImage } from '../../store/slices/gallerySlice'
import { importBlocks } from '../../store/slices/customBlocks/customBlocksSlice'
import { useState, useEffect } from 'react'
import {
  convertFileToBase64,
  convertFileToText,
} from '../../hooks/useFileConversion.js'
import { useTranslation } from 'react-i18next'
import {
  validateMdlcFile,
  readMdlcFile,
  importBlocksFromFile,
} from '../../utils/mdlcFiles.js'

export default function ImportModal({
  onClose,
  mode,
  selectedFolderId: initialFolderId,
  isOpen,
  onImport,
  existingBlocks,
}) {
  const dispatch = useDispatch()
  const { folders } = useSelector((state) => state.markdown)
  const { t } = useTranslation()
  const [selectedFolderId, setSelectedFolderId] = useState(
    initialFolderId || null
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setError(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const getAcceptTypes = () => {
    const types = {
      image: {
        'image/*': [
          '.png',
          '.jpg',
          '.jpeg',
          '.webp',
          '.img.mdlc',
          '.imgs.mdlc',
        ],
      },
      markdown: { 'text/markdown': ['.md'] },
      customBlock: {
        'application/json': ['.part.mdlc', '.parts.mdlc'],
      },
    }
    return types[mode] || types.customBlock
  }

  const acceptTypes = getAcceptTypes()

  const importFromFile = (file, onLoad) => {
    const reader = new FileReader()
    reader.onload = () => onLoad(reader.result)
    reader.readAsText(file)
  }

  const processImages = async (files) => {
    for (const file of files) {
      if (file.name.endsWith('.imgs.mdlc')) {
        importFromFile(file, (result) => {
          JSON.parse(result).forEach(({ name, base64 }) =>
            dispatch(uploadImage({ name, base64 }))
          )
        })
        return
      }

      if (file.name.endsWith('.img.mdlc')) {
        importFromFile(file, (result) => {
          const { name, base64 } = JSON.parse(result)
          dispatch(uploadImage({ name, base64 }))
        })
        return
      }

      const base64 = await convertFileToBase64(file)
      dispatch(uploadImage({ name: file.name, base64 }))
    }
  }

  const processMarkdownFiles = async (files) => {
    for (const file of files) {
      const content = await convertFileToText(file)
      dispatch(
        addMarkdownFile({
          name: file.name.replace('.md', ''),
          body: content,
          folderId: selectedFolderId,
        })
      )
    }
  }

  const processCustomBlocks = async (files) => {
    let success = true
    for (const file of files) {
      try {
        validateMdlcFile(file)
        const content = await readMdlcFile(file)
        const newBlocks = existingBlocks
          ? importBlocksFromFile(content, existingBlocks)
          : JSON.parse(content)
        const blocksToImport = Array.isArray(newBlocks)
          ? newBlocks
          : [newBlocks]
        if (blocksToImport.length === 0) {
          setError(t('importModal.noNewBlocks'))
          success = false
        }
        if (onImport) {
          onImport(blocksToImport)
        } else {
          dispatch(importBlocks(blocksToImport))
        }
      } catch (e) {
        setError(e.message)
        success = false
      }
    }
    return success
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptTypes,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setError(t('importModal.invalidFileType'))
        return
      }
      setError(null)
      if (mode === 'image') {
        await processImages(acceptedFiles)
        onClose()
      } else if (mode === 'markdown') {
        await processMarkdownFiles(acceptedFiles)
        onClose()
        window.dispatchEvent(new CustomEvent('markdownImportComplete'))
      } else {
        const success = await processCustomBlocks(acceptedFiles)
        if (success) {
          onClose()
        }
      }
    },
  })

  if (!isOpen) return null

  const getTitle = () => {
    const titles = {
      image: 'importModal.importImages',
      markdown: 'importModal.importMarkdownFiles',
      customBlock: 'importModal.importCustomBlocks',
    }
    return t(titles[mode] || titles.customBlock)
  }

  const getIcon = () => {
    const icons = {
      image: 'image',
      markdown: 'description',
      customBlock: 'widgets',
    }
    return icons[mode] || icons.customBlock
  }

  const getFileTypes = () => {
    const types = {
      image: 'importModal.imageTypes',
      markdown: 'importModal.markdownTypes',
      customBlock: 'importModal.customBlockTypes',
    }
    return t(types[mode] || types.customBlock)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {mode === 'markdown' && (
          <div className="mb-4">
            <label
              htmlFor="folder-select"
              className="block text-sm font-medium mb-2"
            >
              {t('importModal.selectFolder')}
            </label>
            <select
              id="folder-select"
              value={selectedFolderId || ''}
              onChange={(e) => setSelectedFolderId(e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">{t('importModal.root')}</option>
              {folders.map((folder) => {
                const getFolderPath = (f) => {
                  if (!f.parentId) return f.name
                  const parent = folders.find((p) => p.id === f.parentId)
                  if (!parent) return f.name
                  return `${getFolderPath(parent)}/${f.name}`
                }
                return (
                  <option key={folder.id} value={folder.id}>
                    {getFolderPath(folder)}
                  </option>
                )
              })}
            </select>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <span className="mx-auto mb-4 text-gray-400">
            <span className="material-icons text-5xl">{getIcon()}</span>
          </span>
          {isDragActive ? (
            <p className="text-blue-600">{t('importModal.dropFiles')}</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                {mode === 'customBlock' && onImport
                  ? t('importModal.dragAndDrop')
                  : t('importModal.dragAndDrop')}
              </p>
              <p className="text-sm text-gray-400">{getFileTypes()}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-600 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
