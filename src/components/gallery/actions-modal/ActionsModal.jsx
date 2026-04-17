import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeImage, renameImage } from '../../../store/slices/gallerySlice'
import RenameForm from './RenameForm'
import useClickOutside from '../../../hooks/useClickOutside.js'
import { useTranslation } from 'react-i18next'

export default function ActionsModal({ id, name, src, onClose }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isRenaming, setIsRenaming] = useState(false)
  const modalRef = useClickOutside(onClose)

  const handleExport = () => {
    const data = JSON.stringify({ name, base64: src })
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name}.img.mdlc`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = () => {
    dispatch(removeImage(id))
  }

  const handleRenameSubmit = (newName) => {
    const trimmed = newName.trim()
    if (trimmed && trimmed !== name) {
      dispatch(renameImage({ id, name: trimmed }))
    }
    setIsRenaming(false)
  }

  const actions = [
    { label: t('galleryActions.export'), onClick: handleExport },
    { label: t('galleryActions.rename'), onClick: () => setIsRenaming(true) },
    { label: t('galleryActions.delete'), onClick: handleDelete, danger: true },
  ]

  return (
    <div className="absolute top-8 right-2 z-10" ref={modalRef}>
      {isRenaming ? (
        <RenameForm
          name={name}
          onSubmit={handleRenameSubmit}
          onCancel={() => setIsRenaming(false)}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-32">
          {actions.map(({ label, onClick, danger }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
