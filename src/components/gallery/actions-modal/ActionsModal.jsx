import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeImage, renameImage } from '../../../store/slices/gallerySlice'
import RenameForm from './RenameForm'
import DropdownMenu from '../../global/DropdownMenu'
import { useTranslation } from 'react-i18next'

export default function ActionsModal({ id, name, src }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isRenaming, setIsRenaming] = useState(false)

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
    { label: t('galleryActions.delete'), onClick: handleDelete },
  ]

  return (
    <div className="absolute top-8 right-2 border border-black px-4 py-2 bg-black rounded-sm z-10">
      {isRenaming ? (
        <RenameForm
          name={name}
          onSubmit={handleRenameSubmit}
          onCancel={() => setIsRenaming(false)}
        />
      ) : (
        <DropdownMenu actions={actions} />
      )}
    </div>
  )
}
