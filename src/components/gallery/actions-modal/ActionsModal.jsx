import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeImage, renameImage } from '../../../store/images/imagesSlice'
import RenameForm from './RenameForm'

export default function ActionsModal({ id, name, src }) {
  const dispatch = useDispatch()
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

  return (
    <div className="absolute top-8 right-2 border border-black px-4 py-2 bg-black rounded-sm z-10">
      {isRenaming ? (
        <RenameForm
          name={name}
          onSubmit={handleRenameSubmit}
          onCancel={() => setIsRenaming(false)}
        />
      ) : (
        <ul className="flex flex-col items-center gap-2">
          <ActionLine name="Export" onClick={handleExport} />
          <ActionLine name="Rename" onClick={() => setIsRenaming(true)} />
          <ActionLine name="Delete" onClick={handleDelete} />
        </ul>
      )}
    </div>
  )
}

function ActionLine({ name, onClick }) {
  return (
    <li
      className="cursor-pointer px-2 py-1 text-white rounded-sm hover:bg-gray-300 hover:text-black"
      onClick={onClick}
    >
      {name}
    </li>
  )
}
